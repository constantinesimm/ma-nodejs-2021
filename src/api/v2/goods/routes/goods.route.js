const goodsRouter = require('express').Router();
const {goodsController} = require('../controllers');

goodsRouter.get('/get', goodsController.getProducts);

goodsRouter.put('/create', goodsController.createProduct);

goodsRouter.post('/update', goodsController.updateProduct);

goodsRouter.delete('/remove', goodsController.removeProduct);

module.exports = goodsRouter;
