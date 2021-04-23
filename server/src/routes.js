import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DelivererController from './app/controllers/DelivererController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import StatusController from './app/controllers/StatusController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

import DeliveredNotDeliveredController from './app/controllers/DeliveredNotDeliveredController';

import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.get('/deliverers/:id', DelivererController.index);

routes.use(authMiddleware);

routes.get('/recipient/:id', RecipientController.index);
routes.get('/recipient', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliverer', DelivererController.show);
routes.post('/deliverers', DelivererController.store);
routes.put('/deliverers/:id', DelivererController.update);
routes.delete('/deliverers/:id', DelivererController.delete);

routes.get('/orders/:id', OrderController.index);
routes.get('/order', OrderController.show);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.put('/status/:id/:deliveryman_id', StatusController.update);

routes.get('/problems', DeliveryProblemsController.index);
routes.get('/delivery/:id/problems', DeliveryProblemsController.show);
routes.post('/delivery/:id/problems', DeliveryProblemsController.store);
routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveryProblemsController.delete
);

routes.get('/delivers/:id', DeliveredNotDeliveredController.index);
routes.get('/delivers/:id/deliveries', DeliveredNotDeliveredController.show);

routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
