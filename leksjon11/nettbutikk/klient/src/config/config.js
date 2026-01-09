const env = import.meta.env;

export const config = {
  clientUrl: (env.VITE_CLIENT_URL || "").replace(/\/$/, ""),
  apiUrl: (env.VITE_API_URL || "").replace(/\/$/, ""),
};
