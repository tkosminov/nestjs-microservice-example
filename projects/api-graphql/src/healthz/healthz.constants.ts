export const TOTAL_MEMORY_HEAP = 1000 * 1024 * 1024; // 1G
export const TOTAL_MEMORY_RSS = 1000 * 1024 * 1024; // 1G
export const SERVICE_NAMES: string[] = process.env.SERVICE_NAMES ? JSON.parse(process.env.SERVICE_NAMES) : [];
