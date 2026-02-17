const router = require("express").Router();
const Course = require("../models/Course");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req,file,cb)=>{
        cb(null, Date.now()+"-"+file.originalname);
    }
});

const upload = multer({storage});

// Upload Video
router.post("/upload", upload.single("video"), async(req,res)=>{
    const course = new Course({
        title: req.body.title,
        video: req.file.filename
    });

    await course.save();
    res.json({message:"Video Uploaded"});
});

// Get All Courses
router.get("/", async(req,res)=>{
    const courses = await Course.find();
    res.json(courses);
});

module.exports = router;
