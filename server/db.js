import mongoose from "mongoose";

let cachedConnection = null;

export function hasDatabaseConfig() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI in environment configuration.");
  }

  mongoose.set("strictQuery", true);
  cachedConnection = mongoose.connect(mongoUri);

  return cachedConnection;
}
