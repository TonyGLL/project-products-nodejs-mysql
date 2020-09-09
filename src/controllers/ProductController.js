const { query } = require("express");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT p.*, u.name AS 'unitName' FROM products p INNER JOIN units u ON u.id = p.unit_id", (err, products) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.status(200).render('products', {
                data: products
            });
        });
    })
}

controller.save = (req, res) => {

    const { name, unit_id, price, stock } = req.body;

    const total_product = req.body.price * req.body.stock;

    const newData = new Object({
        name,
        unit_id,
        price,
        stock,
        total_product
    });

    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        conn.query('INSERT INTO products set ?', [newData], (err, product) => {
            res.redirect('/');
        });
    })
}

controller.edit = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
            if (err) {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        err
                    });
                }
            }
            res.render('product_edit', {
                data: product[0]
            });
        });
    })
}

controller.update = (req, res) => {
    const { id } = req.params;

    const newProduct = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE products set ? WHERE id = ?', [newProduct, id], (err, product) => {
            if (err) {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        err
                    });
                }
            }
            res.redirect('/');
        });
    })
}

controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM products WHERE id = ?', [id], (err, product) => {
            if (err) {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        err
                    });
                }
            }
            res.redirect('/');
        });
    })
}

controller.search = (req, res) => {
    const name = req.body.search;

    req.getConnection((err, conn) => {
        conn.query("SELECT p.*, u.name AS 'unitName' FROM products p INNER JOIN units u ON u.id = p.unit_id WHERE p.name LIKE '%" + name + "%'", (err, searchProducts) => {
            if (err) {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        err
                    });
                }
            }
            res.status(200).render('search', {
                data: searchProducts,
                name
            });
        });
    });
}

module.exports = controller;