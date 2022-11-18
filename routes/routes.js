const Container = require('../api/index.js') // IMPORTO EL CLASS CONTAINER DEL INDEX
const archivoProductos = new Container('../api/productos.json'); 

let {Router} = require('express');
let router = new Router(); 

router.get("/",async(req,res,next)=>{
    try {
        let productos = await archivoProductos.getAll();
        res.send(productos);
    } catch (error) {
        console.log(error);
    }
});
router.get("/:id", async(req,res,next)=>{
    try {
        let buscarID = req.params.id
        let buscarProducto = await archivoProductos.getById(buscarID);
        res.send(buscarProducto);
    } catch (error) {
        console.log(error);
    }
});

//agregar un producto
router.post("/", async(req,res,next)=>{
    try {
        let {title,price,src} = req.body
        if(!title||!price||!src){
            console.log("faltan valores");
        }else{
            let newProduct = {
                title,
                price,
                src
            };
            await archivoProductos.save(newProduct);
            res.send(`${newProduct.id}`);
        }
    } catch (error) {
        console.log(error);
    }
});

//actualizar un producto
router.put("/:id", async(req,res,next)=>{
    try {
        let id = req.params.id;
        let {title,price,src} = req.body
        if(!title || !price || !src){
            res.send("faltan datos")
        }else{
            let updateProduct ={
                id,
                title,
                price,
                src
            };
            await archivoProductos.update(updateProduct)
            res.send(`se actualizo el producto ${updateProduct.title}`)
        }
    } catch (error) {
        console.log(error)
    }
});

//borrar un producto
router.delete("/:id", async(req,res,next)=>{
    try {
        let id = req.params.id;
        await archivoProductos.deleteById(id);
        console.log("producto borrado con exito")
        res.send(`producto con el Id ${id} fue borrado con exito`)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router ;
