export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

function readCookie(name: string): string {
  const row = document.cookie
    .split("; ")
    .find((line) => line.startsWith(name + "="));
  return row ? decodeURIComponent(row.split("=")[1]) : "";
}

export async function csrf(): Promise<void> {
  if (readCookie("XSRF-TOKEN")) {
    return;
  }
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

  if (response.status === 204) {
    return;
  }

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message ?? "Request failed");
  }

  return json.data;
}
