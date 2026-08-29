import express from "express";
import { PORT } from "./config/env.js";
const app = express();

app.get("/", (req, res) => {
  console.log("Whattsub");
});

const server = app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});

export default app;
