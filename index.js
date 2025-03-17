import express from 'express';
import routerApi from "./routes/index.js";
import { logErrors, errorHandler, boomErrorHandler } from "./middlewares/error.handler.js"
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware, para procesar solicitudes JSON
app.use(express.json());

app.use(cors()); // Middleware para habilitar CORS a CUALQUIER dominio

// Habilitar CORS a un dominio específico
// const whitelist = [ 'http://localhost:8080', 'https://otrodominio.com' ];
// const options = {
//   origin: (origin, callback) => {
//     if (!whitelist.includes(origin)) {
//       callback(new Error('Origen no permitido.'));
//     } else {
//       callback(null, true);
//     }
//   }
// }
// app.use(cors(options)); // Middleware para habilitar CORS a dominios específicos

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/endpoint', (req, res) => {
  res.send('Endpoint!');
});

// Enviamos el app para que lo utilicen los routers
routerApi(app);

app.use(logErrors); // Primero middleware que si utiliza "next()"
app.use(boomErrorHandler); // Middleware para errores de tipo boom
app.use(errorHandler); // Al final middleware que envía una respuesta

app.listen(port, () => {
  console.log('Port: ', port);
});
