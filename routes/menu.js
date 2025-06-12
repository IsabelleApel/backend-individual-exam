import { Router } from 'express';
import { getMenu, addProduct, updateProduct, deleteProduct } from '../services/menu.js';
import { validateProductBody } from '../middlewares/validators.js';
import { v4 as uuid } from 'uuid';
import { authorizeAdmin } from '../middlewares/authorizers.js';

const router = Router();

router.get('/', async (req, res, next) => {
    const menu = await getMenu();
    if(menu) {
        res.json({
            success : true,
            menu : menu
        });
    } else {
        next({
            status : 404,
            message : 'Menu not found'
        });
    }
})

//POST add new product
router.post('/', validateProductBody, authorizeAdmin, async (req, res, next) => {
    const {title, desc, price} = req.body;
    const result = await addProduct({
        prodId: `prod-${uuid().substring(0, 5)}`,
        title: title,
        desc: desc,
        price: price
    })
    if(result) {
        res.json({
            success : true,
            product : result
        })
    } else {
        next({
            status : 404,
            message : 'Product NOT added successfully'
        })
    }
});

//PUT update product
router.put('/:prodId', validateProductBody, authorizeAdmin , async (req, res, next) => {
    const { prodId } = req.params;
    const {title, desc, price} = req.body;
    const result = await updateProduct(prodId, {
        title : title,
        desc : desc,
        price : price
    });
    if(result) {
        res.json({
            success : true,
            message : 'Product updated successfully'
        })
    } else {
        next({
            status : 404,
            message : 'Product NOT updated successfully'
        })
    }
});

//DELETE product
router.delete('/:prodId', authorizeAdmin, async (req, res, next) => {
    const {prodId} = req.params;
    const result = await deleteProduct(prodId);
    if(result) {
        res.json({
            success : true,
            message : 'Product deleted successfully'
        })
    } else {
        next({
            status : 404,
            message : 'Product not found'
        })
    }
});

export default router;