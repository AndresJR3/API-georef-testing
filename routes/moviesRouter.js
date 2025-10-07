const express = require('express');
const router = express.Router();

let movies = [
  {
    id:1,
    tittle: "Tron",
    year: 2010,
    category: "Sci-Fi"
  },
  {
    id: 2,
    tittle: "El renacido",
    year: 2018,
    category: "Suspense"
  },
  {
    id: 3,
    tittle: "Shrek 2",
    year: 2023,
    category: "Animada"
  }
]

//obtener todas las películas que creamos
router.get("/", (req, res) => {
  res.json(movies);
});

//obtener una peli por ID
router.get("/:id", (req, res) => {
  const {id} = req.params; //porque es de tipo ruta
  const movie = movies.find(item => item.id === parseInt(id));
  if(movie){
    res.json(movie);
  } else {
    res.status(404).json({message: "Movie Not found"});
  }
})

//crear una nueva película
router.post("/", (req, res) => {
  const {tittle, year, category} = req.body; //porque es de tipo body
  const newMovie = {
    id: movies.length + 1,
    tittle,
    year,
    category
  }
  movies.push(newMovie);
  res.status(201).json(newMovie);
    message: "movie created"
    data: body
})

//actualizar una película con PATCH
router.patch("/:id", (req, res) => {
  const {id} = req.params; //porque es de tipo ruta
  const {tittle, year, category} = req.body;
  const movie = movies.find(item => item.id === parseInt(id));
  if(movie){
    if(tittle) movie.tittle = tittle;
    if(year) movie.year = year;
    if(category) movie.category = category;
    res.json({
      message: "movie updated",
      data: movie
    })
  } else {
    res.status(404).json({message: "Movie Not found"});
  }
})

//Eliminar una película
router.delete("/:id", (req, res) => {
  const {id} = req.params;
  const movieIndex = movies.findIndex(item => item.id === parseInt(id));
  if(movieIndex !== -1){ // si es diferente de -1 es porque lo encontró
    movies.splice(movieIndex, 1);
    res.json({
      message: "movie deleted",
      id});
  } else {
    res.status(404).json({message: "Movie not found"});
  }
})

module.exports = router;
