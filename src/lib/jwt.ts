import type { JwtPayload, User } from "../types/auth";
import { jwtDecode } from "jwt-decode";

/**
 * Decode JWT token → return simplified User object.
 */
export const decodeToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return {
      id: decoded.user_id,
      role: decoded.role,
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

/**
 * Check if the token has expired.
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true; // missing expiration → treat as expired

    const now = Math.floor(Date.now() / 1000); // current time in seconds
    return decoded.exp < now;
  } catch (error) {
    console.error("Failed to check token expiration:", error);
    return true;
  }
};

/**
 * Get token expiration date as a JS Date object.
 */
export const getTokenExpiration = (token: string): Date => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) throw new Error("Missing exp claim");

    return new Date(decoded.exp * 1000); // convert seconds → milliseconds
  } catch (error) {
    console.error("Failed to get token expiration:", error);
    return new Date(0); // epoch date as fallback
  }
};

/**
 * Check if a string looks like a valid JWT and can be decoded.
 */
export const isValidJwt = (token: string): boolean => {
  try {
    if (!token || token.split(".").length !== 3) return false;

    const decoded = jwtDecode<JwtPayload>(token);
    return (
      typeof decoded.user_id === "string" &&
      typeof decoded.role === "string" &&
      typeof decoded.exp === "number"
    );
  } catch (error) {
    console.error("Invalid JWT format:", error);
    return false;
  }
};
