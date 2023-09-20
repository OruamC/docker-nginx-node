const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTable = `CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name VARCHAR(255), PRIMARY KEY (id));`
connection.query(createTable)

const sql = `INSERT INTO people(name) values ('Pablo');`
connection.query(sql)
connection.end()


app.get('/', (req, res) => {
  let retorno = "<h1>Full Cycle Rocks!</h1><br><p>"
  const connection = mysql.createConnection(config)
  const sql = "SELECT * from nodedb.people"
  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    for (let index = 0; index < result.length; index++) {
      let concat = `${result[index].name} `
      retorno = retorno.concat(concat)
    }
    connection.end();
    retorno = retorno.concat("<p>")
    console.log(retorno)
    res.send(retorno)
  });
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})