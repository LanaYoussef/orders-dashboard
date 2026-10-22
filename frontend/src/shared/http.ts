export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

function readCookie(name: string): string {
  const row = document.cookie
    .split("; ")
    .find((line) => line.startsWith(name + "="));
  return row ? decodeURIComponent(row.split("=")[1]) : "";
}

export async function csrf(): Promise<void> {
  await fetch("/sanctum/csrf-cookie", { credentials: "include" });
}

export async function http(method: Method, url: string, body?: any) {
  const response = await fetch(url, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": readCookie("XSRF-TOKEN"),
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (response.status === 204) {
    return;
  }
  return json.data;
}
