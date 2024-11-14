const CartRouter = require('express').Router();
const { AddCartController, removeCartController, getCartController, changeQuantityController, clearCart } = require('../controllers/CartController');

// Update route to use userId
CartRouter.post('/add/:userId', AddCartController);
CartRouter.delete('/delete/:userId', removeCartController);
CartRouter.get('/get/:userId', getCartController);
CartRouter.patch('/change/:userId', changeQuantityController);
CartRouter.post('/clear', clearCart);


module.exports = CartRouter;