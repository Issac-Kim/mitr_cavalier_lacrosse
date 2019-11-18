const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

router.post('/upload', upload.single('photo'), async (req, res) => {
    if(req.file) {
        res.json(req.file);
    } else throw 'error';
});

//add enctype="multipart/form-data" to form
//"<input class="form-control-file" type="file" accept="image/*" name="photo" >"