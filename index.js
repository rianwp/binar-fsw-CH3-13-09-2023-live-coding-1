const fs = require("fs")
const http = require("http")

// sync
// const textIn = fs.readFileSync("./txt/read-this.txt", "utf-8")

// console.log(textIn)

// const textOut = `ini tuh penjelasan alpukat dlm b ing: ${textIn}`
// fs.writeFileSync("./txt/output.txt", textOut)
// console.log("sukses")

// async
// const test = fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     fs.readFile(`./txt/final.txt`, "utf-8", (err, data3) => {
//       fs.writeFile(`./txt/gabungan2.txt`, `${data2}\n${data3}`, err => {
//         console.log("sukses menggabungkan data")
//       })
//     })
//   })
// })

////////////////////////////////////////
// SERVER dengan HTTP

const server = http.createServer((req, res) => {
  const pathName = req.url
  if (pathName === "/hello") {
    res.end("ini hello ke FSW 2")
  } else if(pathName === "/product") {
    res.end(JSON.stringify({
      data: "ini product"
    }))
  } else if(pathName === "/api") {
    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`)
    res.writable(200, {
      "Content-type": "application/json"
    })
    res.end(data)
  } else if(pathName === "/overview") {
    const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`)
    res.writable(200, {
      "Content-type": "text/html"
    })
    res.end(overviewPage)
  } else {
    res.writeHead(404, {
      "Content-type": "text/html"
    })
    res.end("<h1>url ini gaada apa-apa</h1>")
  }
})

server.listen(8000, "127.0.0.1", () => {
  console.log("servernya jalan")
})
