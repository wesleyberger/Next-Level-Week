const express = require("express")
const server = express()

// ligar o server
server.listen(3000)

// utilizando template engine (nunjucks!)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache:true
})

// configurar caminhos da minha aplicação
//pag inicial
server.get("/", (req, res) => {
    return res.render("index.html")
})
// configurar pag create-point
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})
// configurar pasta publica
server.use(express.static("public"))