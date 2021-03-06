const express = require('express');
const { getMyCart, addMyCart, adjustMyCart , removeMyCart } = require('../Controller/BasketController')

const router = express.Router();

//get item cart
router.get('/', getMyCart);
//add to cart
router.post('/', addMyCart);
//adjust qty item in cart
router.put('/', adjustMyCart)
//remove item cart
router.delete('/:id', removeMyCart)



module.exports = router;