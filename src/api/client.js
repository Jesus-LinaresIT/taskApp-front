const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // si expira o no válido, lanza 401 para que el AuthContext cierre sesión
  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message || data?.error || "Error de API";
    throw new Error(msg);
  }
  return data;
}
