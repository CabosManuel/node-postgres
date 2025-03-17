import express from 'express';
import ProductsService from '../services/products.service.js';
import { validatorHandler } from '../middlewares/validator.handler.js';
import { createProductSchema, updateProductSchema, getProductSchema } from '../schemas/product.schema.js';

// Router especifico para productos
const router = express.Router();
const service = new ProductsService(); // Servicio de productos

// Endpoints que van despues de /products:

router.get('/', async (req, res) => {
  const products = await service.getAll();
  res.json(products);
});


router.get('/filter', (req, res) => {
  res.send('Filter!');
});

router.get('/:productId',
  // 1. Pasa el schema y parámetros al middleware de validación
  validatorHandler(getProductSchema, 'params'),
  // 2. Ejecutar la función
  async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await service.findOne(productId);
    return res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  // 1. Pasar el schema y el body al middleware de validación
  validatorHandler(createProductSchema, 'body'),
  // 2. Ejecutar la función
  async (req, res) => {
  const body = req.body;

  const product = await service.create(body);
  res.status(201).json({
    message: 'Created',
    data: product,
  });
});

router.patch('/:id',
  // Utilizamos 2 middlewares, uno para los parámetros y otro para el body
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const product = await service.update(id, body);
    res.json({
      message: 'Updated',
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  const productDeletedId = service.delete(productId);
  res.json({
    message: 'Deleted',
    productDeletedId,
  });
});

// Exportamos el router
export default router;
