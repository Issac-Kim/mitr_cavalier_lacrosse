const router = require('express').Router();
const multer = require('multer');

router.post('/upload/:id', multer().array('photo', 20), async (req, res) => {
    console.log(req.body);
});

module.exports = router;