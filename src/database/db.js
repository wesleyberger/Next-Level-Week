// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//iniciar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")  //constructor ou classe criando um banco no end. setado

module.exports = db

// // utilizar o obejto de banco de dados para nossas operaões
// db.serialize( () => {
//     // Criar tabela (foi usado ` para conseguir dar uma quebra de linha no code)
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // Inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             name,
//             image,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?)        
//     `
//     const values = [
//         "Madeira Reciclável",
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQPW6Dzg11AQ_g4WTBEPg03Vu1zYLBn_9-mtZfvZZqgimztoPb&usqp=CAU",
//         "Paraíso das araucárias, Jardim Paraná",
//         "Número 101",
//         "Paraná",
//         "Curitiba",
//         "vidros e garrafas"
// ]
//     function afterInsertata(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log("cadastrado com sucesso")
//         console.log(this)
//     }

// db.run(query, values, afterInsertata)
   
//     // Consultar os dados da tabela
    // db.all(`
    //     SELECT * FROM places`, function(err, rows) {
    //         if(err) {
    //             return console.log(err)
    //         }
    //         console.log("Aqui estão seus registros: ")
    //         console.log(rows)
    //     })

// // Deletar um dado da tabela
     db.run(`DELETE FROM places WHERE id = ?`, [33], function(err){
        if(err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso")
    })
// })