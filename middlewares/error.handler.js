// Middleware con "next", que sí envía el error al siguiente middleware
export function logErrors (error, req, res, next) {
  console.log('🚀 ~ logErrors');
  console.error(error);
  next(error);
}

// Middleware sin "next", pero con "res" que responde con un error y terminar la petición
export function errorHandler (error, req, res, next) {
  console.log('🚀 ~ errorHandler');
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}

// Middleware para capturar errores generados por la librería @hapi/boom
export function boomErrorHandler(error, req, res, next) {
  if (!error.isBoom) { // Si no es boom pasar al sig. middleware
    next(error);
  } else { // Error isBoom
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  }
}
