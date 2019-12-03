const router = require('express').Router();
const Image = require("../models/image.js");
const multer = require('multer');

router.post('/upload/:page', multer().array('photo', 20), async (req, res) => {
    if(req.files) {
        for (i = 0; i < req.files.length; i++) {
            const img = new Image ({
                data: req.files[i],
                page: req.params.page
            });
            try {
                await img.save()
            } catch(error){
                res.status(400).send(error);
            }
        }
        res.redirect('/');
      } else {
        throw err;
      }
});


module.exports = router;