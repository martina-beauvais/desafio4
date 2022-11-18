const express = require('express');
const app = express()

const PORT = 8080

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let serverRoutes = require ('./routes/routes.js')
app.use("/api/productos", serverRoutes);