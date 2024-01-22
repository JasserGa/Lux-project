const router= require('express').Router()
const controller=require('../controller/controller.js')



router.get("/getAll",controller.getAllProduct)
router.get("/getOne/:id",controller.getOneProduct)
router.post("/add",controller.createProduct)
router.delete("/delete/:id",controller.deleteProduct)
router.put("/update/:id",controller.updateProduct)

module.exports=router