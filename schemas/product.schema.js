import Joi from 'joi'

// Archivo con las validaciones de los productos
// Se utiliza Joi para validar los campos de los productos

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri()

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

export const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

export const getProductSchema = Joi.object({
  id: id.required(),
});
