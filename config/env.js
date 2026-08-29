/* eslint-disable no-undef */
import { config } from "dotenv";

// Nạp file biến môi trường (đường dẫn path phụ thuộc vào tên file bạn dùng)
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

// Export các biến ra để file mongoDB.js có thể import
export const { DB_URI, NODE_ENV, PORT } = process.env;
