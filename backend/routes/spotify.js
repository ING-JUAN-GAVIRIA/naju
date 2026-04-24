const express = require("express");
const axios = require("axios");
const router = express.Router();

let token = "";

// 🔥 Obtener token Spotify
const getToken = async () => {
  try {
    const res = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: new URLSearchParams({
        grant_type: "client_credentials",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from("9704328766994660ae64e65db8b809c3:0c82d4e358d64db489f2f138da353054").toString("base64"),
      },
    });

    token = res.data.access_token;

  } catch (err) {
    console.log("❌ ERROR TOKEN:", err.response?.data || err.message);
  }
};

// 🔍 Buscar canciones
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    // 🔥 siempre obtener token nuevo
    await getToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${q}&type=track&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data.tracks.items);

  } catch (err) {
    console.log("❌ ERROR BUSQUEDA:", err.response?.data || err.message);
    res.status(500).json({ error: "Error Spotify" });
  }
});

module.exports = router;