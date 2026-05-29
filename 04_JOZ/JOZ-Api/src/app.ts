import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middleware/error.middleware";
import { setRoutes } from "./routes/index";

const app = express();

const allowedOrigins = new Set(["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:4173", "http://127.0.0.1:4173"]);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

// Set routes
setRoutes(app);

// Error handling middleware
app.use(errorMiddleware);

export default app;
