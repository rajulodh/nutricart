import "dotenv/config";
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { connectDatabase, hasDatabaseConfig } from "./db.js";
import { createUser, findUserByEmail, findUserById, getUserStoreLabel } from "./userStore.js";

const app = express();
const port = Number(process.env.PORT || 5000);
const clientOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:8080")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || clientOrigins.length === 0 || clientOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Request blocked by CORS policy."));
    },
  }),
);
app.use(express.json());

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("Missing JWT_SECRET in environment configuration.");
  }

  return secret || "development-auth-secret";
}

function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function validateCredentials({ name, email, password }, requireName = false) {
  if (requireName && (!name || name.trim().length < 2)) {
    return "Please enter your full name.";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }

  if (!password || password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  return null;
}

function signToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
    },
    getJwtSecret(),
    {
      expiresIn: "7d",
    },
  );
}

async function requireAuth(request, response, next) {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    response.status(401).json({ message: "Authentication required." });
    return;
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();
    const payload = jwt.verify(token, getJwtSecret());
    request.userId = payload.sub;
    next();
  } catch (error) {
    response.status(401).json({ message: "Your session has expired. Please log in again." });
  }
}

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post("/api/auth/signup", async (request, response, next) => {
  try {
    const { name = "", email = "", password = "" } = request.body || {};
    const validationMessage = validateCredentials({ name, email, password }, true);

    if (validationMessage) {
      response.status(400).json({ message: validationMessage });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      response.status(409).json({ message: "An account with this email already exists." });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    });

    response.status(201).json({
      message: "Account created successfully.",
      token: signToken(user),
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/auth/login", async (request, response, next) => {
  try {
    const { email = "", password = "" } = request.body || {};
    const validationMessage = validateCredentials({ email, password });

    if (validationMessage) {
      response.status(400).json({ message: validationMessage });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      response.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      response.status(401).json({ message: "Invalid email or password." });
      return;
    }

    response.json({
      message: "Welcome back.",
      token: signToken(user),
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/auth/me", requireAuth, async (request, response, next) => {
  try {
    const user = await findUserById(request.userId);

    if (!user) {
      response.status(404).json({ message: "User not found." });
      return;
    }

    response.json({ user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);

  if (error?.message === "Request blocked by CORS policy.") {
    response.status(403).json({ message: error.message });
    return;
  }

  response.status(500).json({
    message: "Something went wrong on the server. Please try again.",
  });
});

async function startServer() {
  if (hasDatabaseConfig()) {
    await connectDatabase();
  } else {
    console.warn("MONGODB_URI is not set. Authentication is using the local file store.");
  }

  app.listen(port, () => {
    console.info(`Authentication API is running on port ${port} using ${getUserStoreLabel()}.`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the server:", error.message);
  process.exit(1);
});
