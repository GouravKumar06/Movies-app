import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        const extname = path.extname(file.originalname);
        cb(null,`${file.fieldname}-${Date.now()}${extname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|webp|png/;
    const mimetypes = /image\/jpe?g|image\/webp|image\/png/;
   
    const extname = path.extname(file.originalname);
    const mimetype = file.mimetype;

    if(filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true);
    } else {
        cb("Error: Images Only!",false);
    }
    
}

const upload = multer({storage,fileFilter})
const uploadMiddleware = upload.single("image");

router.post("/",(req,res) => {
    uploadMiddleware(req, res, (err) => {
        if(err) {
            return res.status(400).json({message: err});
        }else if(req.file){
            return res.status(200).json({
                message: "File uploaded successfully",
                image: `/${req.file.path}`
            });
        } 
        else{
            return res.status(400).json({message: "File not uploaded"});
        }
    })
})
export default router;
