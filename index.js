import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000; // Puerto dinámico para despliegue

// Configuración de la carpeta pública
app.use(express.static("public"));

// Configuración del motor de vistas EJS
app.set("view engine", "ejs");

// Ruta principal
app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index", {
      secret: result.data.secret,
      user: result.data.username,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Error fetching data.");
  }
});

// Ruta para obtener un nuevo secreto en formato JSON
app.get("/new-secret", async (req, res) => {
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/random");
    res.json({
      secret: result.data.secret,
      user: result.data.username,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching data." });
  }
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
