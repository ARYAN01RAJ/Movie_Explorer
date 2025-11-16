import express from "express";
import axios from "axios";
import { OMDB_API_KEY, OMDB_URL } from "../config/omdb.js";

const router = express.Router();

// =========================
// SEARCH MOVIES
// /api/search?query=batman
// =========================
router.get("/search", async (req, res) => {
    try {
        const query = req.query.query;

        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        const response = await axios.get(`${OMDB_URL}?apikey=${OMDB_API_KEY}&s=${query}`);

        if (response.data.Response === "False") {
            return res.status(404).json({ error: response.data.Error });
        }

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// =========================
// GET MOVIE BY ID
// /api/movie/tt3896198
// =========================
router.get("/movie/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const response = await axios.get(`${OMDB_URL}?apikey=${OMDB_API_KEY}&i=${id}&plot=full`);

        if (response.data.Response === "False") {
            return res.status(404).json({ error: response.data.Error });
        }

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
