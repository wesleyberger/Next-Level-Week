// chamar express
const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// ligar o server
server.listen(3000)

// configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body no express
server.use(express.urlencoded({ extended: true }))

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

// pag create-point
    // req.query: query string da nossa url
    //console.log(req.query)

    server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

// post de envio de formulário
server.post("/savepoint", (req,res) => {
    // objeto req.body: o corpo do formulário
    //console.log(req.body)

    // Inserir dados na tabela 
    const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?)        
    `
    const values = [
       req.body.name,
       req.body.image,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
]
    function afterInsertata(err) {
        if(err) {
            return res.send("Erro no cadastro!")
        }
        console.log("cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

db.run(query, values, afterInsertata)
    
})

// pag search-results
server.get("/search", (req, res) => {
    const search = req.query.search
    // pegar os dados do banco de dados 
    db.all(`
        SELECT * FROM places WHERE city or state LIKE '%${search}%'`, function(err, rows) {
            if(err) {
                return console.log(err)
            }

            const total = rows.length

            // mostrar a pg html com os dados do banco de dados
            return res.render("search-results.html", { places: rows, total: total})
    })
})