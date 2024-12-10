
const moment = require('moment')
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    let extname = path.extname(filePath)

    let contentType = 'text/html'
    switch (extname) {
        case '.css':
            contentType = 'text/css'
            break;
        case '.js':
            contentType = 'application/javascript'
            break
        case '.png':
            contentType = 'image/png'
            break
        default:
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, {"content-type" : "text/html"})
                res.end('<h> Arquivo não encontrado </h1>')
            } else {
                res.writeHead(500, {"content-type": "text/html"})
                res.end('<h> Erro no Servidor </h1>')
            }
        } else {
            res.writeHead(200, {'content-type': contentType})
            res.end(content, 'utf-8')
        }
    })
})


server.listen(3000, () => {
    console.log(`Servidor iniciado em ${moment().format('DD/MM/YYYY HH:mm')}`);
    console.log("Servidor rodando em http://localhost:3000");
})