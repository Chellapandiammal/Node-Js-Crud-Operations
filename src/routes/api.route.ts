import { Router } from "express";
import * as ProductController from '../controllers/product.controller';

const apiRoutes = Router();

apiRoutes.get('/products', ProductController.index);
apiRoutes.get('/products/:id', ProductController.show);
apiRoutes.post('/products', ProductController.store);
apiRoutes.put('/products/:id', ProductController.update);
apiRoutes.delete('/products/:id', ProductController.destroy);

export default apiRoutes;