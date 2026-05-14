import { env } from "./env";

export const platformTag = `[${env.PLATFORM}]`;
export const isProduction = env.NODE_ENV === "production";
export const isPrimaryInstance = env.IS_PRIMARY;
