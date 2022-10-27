const uuid = require('uuid');

const express = require('express');
const router = express.Router();

const {product_list, product_create, product_update, product_delete} = require('./products');



router.get(
    '/', 
    (request, response) => {
        response.json(product_list);
}
);

router.post(
    '/',
    (request, response) => {
        response.json(product_create(request, response));
    }
);

router.put(
    '/:id',
    (request, response) => {
        response.json(product_update(request, response));
    }
)

router.delete(
    '/:id',
    (request, response) => {
        response.json(product_delete(request, response));
    }
)


module.exports = router;