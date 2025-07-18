// client.ts
import { hcWithType } from "../../../server/dist/client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

// Ignoring all types (no AppType or route checking)
// export const client = hcWithType(SERVER_URL as never) as never;
export const client = hcWithType(SERVER_URL as unknown as any) as any;


