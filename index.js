const express = require('express');
const routerApi = require('./routes/rutas');

/* la instancia de como lo utilizamos */
const app = express(); //
const port = 2000;
app.use(express.json()); //middleware para que el servidor entienda json


app.get("/", (req, res) => {
  res.send("Hola Mundo");
})

/* Puerto donde estará corriendo */
app.listen(port, () => {
  console.log("My server is working on : " + port)
})


/* Rutas */
app.get("/nuevaruta", (req, res) => {
  res.send("Hola desde la nueva ruta");
})

routerApi(app);


/* Paranetros de tipo ruta categories/1/products/1 */
app.get("/categories/:categoryId/products/:productId", (req, res) => {
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId
  })
})

/* parametro de tipo quey dentro del navegador se pone-> users?username=Andres&lastname=Jaime*/
app.get("/users", (req, res) =>{
  const {username, lastname} = req.query;
  if(username && lastname){
    res.json({
      username,
      lastname
    });
  } else {
    res.status(400).json({
      message: "Faltan datos"
    })
  }
})


