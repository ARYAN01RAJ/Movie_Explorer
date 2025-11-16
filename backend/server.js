import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/movies.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", movieRoutes);

// Root
app.get("/", (req, res) => {
    res.send("Movie Explorer Backend is running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
