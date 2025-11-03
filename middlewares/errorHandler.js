function logErrors(err, req, res, next){
  console.error(err);
  next(err); // al enciarle el err entinde que es middleware de error
}

function errorHandler(err, req, res, next){
  res.status(500).json({
    message: err.message,
    stack: err.stack, //mensaje donde paso el errorsototototototote
  });
}


module.exports = { logErrors, errorHandler };
