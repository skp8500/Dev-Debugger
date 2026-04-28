import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { CookieOptions } from "express";

const SESSION_SECRET = process.env["SESSION_SECRET"];
if (!SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET environment variable is required for JWT signing.",
  );
}

const SECRET: string = SESSION_SECRET;

export const COOKIE_NAME = "devdebug_token";
export const TOKEN_EXPIRY = "15d";
export const TOKEN_EXPIRY_MS = 15 * 24 * 60 * 60 * 1000;

export type JwtPayload = {
  userId: string;
};

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    if (typeof decoded !== "object" || !decoded.userId) return null;
    return decoded;
  } catch {
    return null;
  }
}

export function getCookieOptions(): CookieOptions {
  const isProd = process.env["NODE_ENV"] === "production";
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    maxAge: TOKEN_EXPIRY_MS,
    path: "/",
  };
}
