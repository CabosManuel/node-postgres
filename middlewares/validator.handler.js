import boom from "@hapi/boom";

// 1. Función para hacer validaciones que recibe un schema y un property
export function validatorHandler (schema, property) {
  // 2. Closure, retorna y ejecuta una función que recibe y conserva los valores req, res y next
  return (req, res, next) => {
    // 3. Extrae los datos de la propiedad específica del objeto req, por ejemplo, req.body, req.params o req.query
    const data = req[property];

    // 4. Valida los datos con el schema proporcionado
    const { error } = schema.validate(
      data,
      { abortEarly: false } // Opción para que envíe todos los errores, y no uno por uno
    );

    // Si no hay errores de validación, con next() continuamos al siguiente middleware
    if (!error) {
      next();
    } else { // Si hay errores de validación, enviamos un error de tipo Boom
      next(boom.badRequest(error));
    }
  }
}
