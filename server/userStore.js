import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDatabase, hasDatabaseConfig } from "./db.js";
import { User } from "./models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localUsersPath = path.join(__dirname, "data", "users.json");

let localWriteQueue = Promise.resolve();

function usingMongoStore() {
  return hasDatabaseConfig();
}

async function ensureLocalUsersFile() {
  await mkdir(path.dirname(localUsersPath), { recursive: true });

  try {
    await readFile(localUsersPath, "utf8");
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }

    await writeFile(localUsersPath, "[]\n", "utf8");
  }
}

async function readLocalUsers() {
  await ensureLocalUsersFile();
  const rawUsers = await readFile(localUsersPath, "utf8");

  try {
    const parsedUsers = JSON.parse(rawUsers);
    return Array.isArray(parsedUsers) ? parsedUsers : [];
  } catch {
    return [];
  }
}

async function queueLocalWrite(task) {
  const result = localWriteQueue.then(task);
  localWriteQueue = result.catch(() => {});
  return result;
}

export function getUserStoreLabel() {
  return usingMongoStore() ? "mongodb" : "local-file";
}

export async function findUserByEmail(email) {
  if (usingMongoStore()) {
    await connectDatabase();
    return User.findOne({ email });
  }

  const users = await readLocalUsers();
  return users.find((user) => user.email === email) ?? null;
}

export async function findUserById(userId) {
  if (usingMongoStore()) {
    await connectDatabase();
    return User.findById(userId);
  }

  const users = await readLocalUsers();
  return users.find((user) => user._id === userId) ?? null;
}

export async function createUser({ name, email, passwordHash }) {
  if (usingMongoStore()) {
    await connectDatabase();
    return User.create({ name, email, passwordHash });
  }

  return queueLocalWrite(async () => {
    const users = await readLocalUsers();
    const timestamp = new Date().toISOString();
    const user = {
      _id: randomUUID(),
      name,
      email,
      passwordHash,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    users.push(user);
    await writeFile(localUsersPath, `${JSON.stringify(users, null, 2)}\n`, "utf8");

    return user;
  });
}
