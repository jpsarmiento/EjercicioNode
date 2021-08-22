const fs = require("fs");
const http = require("http");
const axios = require("axios");
const data = require("./data.json");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    if (req.url === "/api/proveedores") {
      axios
        .get(
          "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
        )
        .then(function (response) {
          fs.writeFile(
            "./data.json",
            JSON.stringify(response.data),
            "utf-8",
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
          var html;
          filas = data.map(filaProveedor).join("");
          html = htmlProveedor(filas);
          fs.writeFileSync("./index.html", html);
          fs.readFile("./index.html", null, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.write(data);
            }
            res.end();
          });
        });
    } else if (req.url === "/api/clientes") {
      axios
        .get(
          "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
        )
        .then(function (response) {
          fs.writeFile(
            "./data.json",
            JSON.stringify(response.data),
            "utf-8",
            (err) => {
              console.log(err);
            }
          );
          filas = data.map(filaCliente).join("");
          html = htmlCliente(filas);
          fs.writeFileSync("./index.html", html);
          fs.readFile("./index.html", null, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.write(data);
            }
            res.end();
          });
        });
    }
  })
  .listen(8081);

const htmlCliente = (i) => `
  <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    </head>
    <body>
    <h1 style="text-align:center">Listado de clientes</h1>
    <table class="table table-striped">
    <thead>
        <tr>
            <th>Id Cliente</th>
            <th>Nombre Compañía</th>
            <th>Nombre Contacto</th>
        </tr>
    </thead>
   ${i}
  </table>
    </body>
  </html>
`;

const filaCliente = (i) => `
    <tbody>
        <tr>
            <td>${i.idCliente}</td>
            <td>${i.NombreCompania}</td>
            <td>${i.NombreContacto}</td>
        </tr>
    </tbody>
`;

const htmlProveedor = (i) => `
  <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    </head>
    <body>
    <h1 style="text-align:center">Listado de proveedores</h1>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Id Proveedor</th>
                <th>Nombre Compañía</th>
                <th>Nombre Contacto</th>
            </tr>
        </thead>
        ${i}
  </table>
    </body>
  </html>
`;

const filaProveedor = (i) => `
    <tbody>
        <tr>
            <td>${i.idproveedor}</td>
            <td>${i.nombrecompania}</td>
            <td>${i.nombrecontacto}</td>
        </tr>
    </tbody>
`;