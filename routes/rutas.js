const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const brandRouter = require('./brandsRouter');
const categoriesRouter = require('./categoriesRouter');
const moviesRouter = require('./moviesRouter');

//va a rutear todas las rutas que le pasemos
function routerApi(app){
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/brands', brandRouter);
  app.use('/categories', categoriesRouter);
  app.use('/movies', moviesRouter);
}

module.exports = routerApi;
