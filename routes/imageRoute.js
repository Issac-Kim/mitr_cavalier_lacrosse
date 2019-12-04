const router = require('express').Router();
const Image = require("../models/image.js");
const multer = require('multer');
const upload = multer({dest: './photos/'});

router.post('/upload/:page', upload.array('photo', 20), async (req, res) => {
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

router.get('/get-images-by-type/:type', async (req, res) => {
    Image.find({page: req.params.type}, function(err, imgs) {
        var imgMap = {};
    
        imgs.forEach(function(img) {
          imgMap[img._id] = img;
        });
    
        res.send(imgMap);  
      });

});


router.get('/page', (req, res) => {
    res.render("photos", {});
  });


module.exports = router;