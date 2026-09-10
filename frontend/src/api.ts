import type { User, UserForm, Weather } from "./types";

export async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  return response.json();
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch("/api/users/" + id);
  return response.json();
}

export async function saveUser(
  form: UserForm,
  editingId: number | null,
): Promise<{ ok: boolean; error?: string }> {
  const isEdit = editingId !== null;
  const response = await fetch(
    isEdit ? "/api/users/" + editingId : "/api/users",
    {
      method: isEdit ? "PUT" : "POST",
      headers: { Content_Type: "application/json" },
      body: JSON.stringify(form),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return { ok: false, error: data.error || "Request failed" };
  }
  return { ok: true };
}

export async function deleteUser(id: number): Promise<void> {
  await fetch("/api/users/" + id, { method: "DELETE" });
}
export async function getMe(): Promise<{ firstName?: string }> {
  const response = await fetch("/api/me.php");
  return response.json();
}
export async function getWeather(): Promise<Weather | null> {
  const response = await fetch("/api/weather.php");
  const data = await response.json();
  if (data.error) return null;
  return data;
}
export async function getHeartbeat(): Promise<boolean> {
  const response = await fetch("/api/heartbeat.php");
  const data = await response.json();
  return Boolean(data.is_alive);
}
