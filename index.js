const fs = require("fs/promises");
const { Contenedor } = require(`./Clases/Contenedor`);
const express = require("express");


const app = express();
const PORT = 8080;

/* Instancia Contenedor */
const contenedor = new Contenedor("productos.txt", fs);

const getAllAlbums = async (req, res) => {
    const productos = await contenedor.getAll();
    res.status(200).json(productos);
};

const getRandomAlbum = async (req, res) => {
    const productos = await contenedor.getAll();
    const idAleatorio = Math.floor(Math.random() * productos.length + 1);
    const productoAleatorio = await contenedor.getById(idAleatorio);
    res.status(200).json(productoAleatorio);
};

app.get("/productos", getAllAlbums);
app.get("/productoRandom", getRandomAlbum);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
