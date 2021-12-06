const discountRoutes = require('express').Router();

discountRoutes
  .route('/promise')
  .get((req, res, next) => res.json({message: 'get promise'}))
  .post((req, res, next) => res.json({message: 'post promise'}));

discountRoutes
  .route('/promisify')
  .get((req, res, next) => res.json({message: 'get promisify'}))
  .post((req, res, next) => res.json({message: 'post promisify'}));

discountRoutes
  .route('/async')
  .get((req, res, next) => res.json({message: 'get async'}))
  .post((req, res, next) => res.json({message: 'post async'}));

discountRoutes
  .route('/callback')
  .get((req, res, next) => res.json({message: 'get callback'}))
  .post((req, res, next) => res.json({message: 'post callback'}));

module.exports = discountRoutes;
