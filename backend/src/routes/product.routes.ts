import { Router} from "express";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { CreateProductSchema, UpdateProductSchema } from "../dtos/product.dto";

const router = Router();
const productController = new ProductController();

router.get('/listado', authMiddleware, productController.listado);
router.get('/producto/:id', authMiddleware, productController.getProducto);
router.post('/crear', validate(CreateProductSchema), authMiddleware, productController.crear);
router.put('/modificar/:id', validate(UpdateProductSchema), authMiddleware, productController.modificar);
router.delete('/eliminar/:id', authMiddleware, productController.eliminar);

export default router;