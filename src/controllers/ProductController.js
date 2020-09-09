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
    const data = req.body;
    console.log(data);

    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        conn.query('INSERT INTO products set ?', [data], (err, product) => {
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

module.exports = controller;