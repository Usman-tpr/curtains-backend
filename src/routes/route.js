const router = require("express").Router()
const auth = require("../middlewares/auth");
const upload = require("../../config/multerConfig")
const {
    signUp ,
    login ,
    post , 
    getAll , 
    getById , 
    deletePost , 
    contact,
    getAllContacts , 
    deleteContact
} = require("../controllers/controller")

router.post("/user" , signUp)
router.post("/login" , login)
router.post("/post" ,upload.array("image" , 5) , auth ,  post)
router.post("/contact" , contact)

router.get("/post" , getAll)
router.get("/contact" , getAllContacts)

router.get("/post/:id" , getById)

router.delete("/post/:id" , deletePost)
router.delete("/contact/:id" , deleteContact)

module.exports = router