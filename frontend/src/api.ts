import type { User } from "./types";

function readCookie(name: string): string {
  const row = document.cookie
    .split("; ")
    .find((line) => line.startsWith(name + "="));
  return row ? decodeURIComponent(row.split("=")[1]) : "";
}

export async function csrf(): Promise<void> {
  await fetch("/sanctum/csrf-cookie", { credentials: "include" });
}

export async function login(email: string, password: string): Promise<User> {
  await csrf();
  const response = await fetch("/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": readCookie("XSRF-TOKEN"),
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message ?? "Login failed");
  }
  return json.data;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users", { credentials: "include" });
  const json = await response.json();
  return json.data;
}
