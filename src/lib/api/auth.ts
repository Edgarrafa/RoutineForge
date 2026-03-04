import type { User } from "@/types";
import { MOCK_USER } from "@/data/mockData";

/**
 * Authenticates a user with email and password.
 * Returns the authenticated User profile on success.
 *
 * @example
 * // Real implementation:
 * const res = await fetch("/api/auth/login", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify({ email, password }),
 * });
 * if (!res.ok) throw new Error("Login failed");
 * return res.json();
 */
export async function login(email: string, password: string): Promise<User> {
  void email; void password;
  // TODO: replace with real API call — see @example above
  return MOCK_USER;
}

/**
 * Ends the current session on the server and clears the auth cookie.
 *
 * @example
 * // Real implementation:
 * await fetch("/api/auth/logout", { method: "POST" });
 */
export async function logout(): Promise<void> {
  // TODO: replace with real API call — see @example above
}

/**
 * Returns the currently authenticated User, or null if unauthenticated.
 * Used to rehydrate auth state on page load (replaces the localStorage check).
 *
 * @example
 * // Real implementation:
 * const res = await fetch("/api/auth/me");
 * if (res.status === 401) return null;
 * return res.json();
 */
export async function getMe(): Promise<User | null> {
  // TODO: replace with real API call — see @example above
  return MOCK_USER;
}
