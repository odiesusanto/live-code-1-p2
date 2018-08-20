const Item = require('../models/item');
const jwt = require('jsonwebtoken');

module.exports = {

    createNewItem: (req, res) => {
        let decoded = jwt.decode(req.headers.token)
        console.log('===',decoded)

        Item.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            tags: req.body.tags
        })
            .then(newItem => {
                res.status(200).json({
                    msg: `New item added!`,
                    newItem
                })
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    showItems: (req, res) => {
        Todo.find()
            .then(allItems => {
                res.status(200).json({
                    msg: `All Items`,
                    data: allItems
                })
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
}