export async function apiFetch(
  url: string,
  options: RequestInit = {}
) {
  const res = await fetch(url, {
    credentials: "include", // send cookies (JWT)
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  
  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  if (res.status === 403) {
    throw new Error("Forbidden");
  }


  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Request failed");
  }

  return res;
}
