let fs = require("fs");   //modulo de node, si quiero leer un archivo de texto que tengo en local simplemte usaré ese módulo para extraer el contenido del fichero, indicando su ruta y otra serie de parámetros que ahora describiremos. Todas las operaciones de acceso al sistema de archivos están en File System.
let path = require("path");   //modulo de node, contiene utilidades para trabajar con rutas de ficheros
require("colors");
const fetch = require("node-fetch");
const { resolve } = require("path");
const process = require("process");
const cliCommand = process.argv;

//  F.01 Identifica mis MD y los imprime
function readFiles(files, absolutePath) {
  let links = [];
  files.forEach((archivo) => {
    const join = path.join(absolutePath, archivo);
    const extension = path.extname(join);
    if (extension === ".md") {
      let data = fs.readFileSync(join, "utf8");
      const newLinks = fileLinks(data);
      links = links.concat(newLinks);
    }
  });
  return links;
}

//  F.02 Obtiene mi array con TODOS los links
const fileLinks = (data) => {
  let linksCollection = [];
  let regularExpression = /\bhttps?:\/\/\S+/gi;
  linksCollection = data.replace(/[{()}]/g, "").match(regularExpression);
  return linksCollection || []; // --> la forma más ideomática de escribir esta idea
};

//  F.03 Esta función la utilizo en mis estadísticas
const linksValidatacion = (links) => {
  let allLinks = links.map((link) => {
    return fetch(link)  // hace una petición a los links // le pido el status de mis links // devuel contenido de peticion // me da el arreglo de promesas
      .then((response) => {   //then  consumo promesa resuelta
        let validate = {
          href: link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText,
        };
        return validate;
      })
      .catch((err) => {   //catch consumo error de promesa
        let validate = {
          href: err.link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText,
        };
        return validate;
      });
    //return allLinks
  });
  return Promise.all(allLinks);   //  resuelve arr de promesas ok para que todas esas promesas se vayan resolviendo
  // .then(response => statsBrokenLinks(response)) // sale pending hasta que todas se revuelvan
  // .catch(err => console.log(err))
};

//  F.04 Valida todos mis links y me retorna un arreglo de objetos con los links ya validados
const allLinksValidation = (links) => {
  let allLinks = links.map((link) => {
    return fetch(link).then((response) => {
      let validate = {
        href: link,
        text: "text",
        path: "path",
        status: response.status,
        statusText: response.statusText,
      };
      console.log("----------------------------------------------------");
      console.log("Results for your link's validation:".inverse.yellow);
      console.log(" ");

      console.log("href:", validate.href);
      console.log("text:", validate.text);
      console.log("path:", validate.path);
      console.log("status:", validate.status);
      console.log("statusText:", validate.statusText);
      //return validate;
    });
  });
};

//  F.05 Estadísticas para links unicos y totales
const totalStats = (linksCollection) => {
  const totalLinks = linksCollection.length;
  const uniqueLinks = [...new Set(linksCollection)].length;

  let statsResult = {
    total: totalLinks,
    unique: uniqueLinks,
  };

  console.log("----------------------------------------------------");
  console.log("Results for your link's stadistics:".inverse.cyan);
  console.log(" ");
  console.log("total links:", statsResult.total);
  console.log("unique links:", statsResult.unique);
  console.log("----------------------------------------------------");
};

//F.06 Estadisticas para LINKS ROTOS
const statsBrokenLinks = (links) => {
  linksValidatacion(links).then((links) => {
    let linksBroken = [];
    let linksOk = [];
    //console.log(linksBroken);
    links.forEach((link) => {
      //console.log(link);
      if (link.status == 200) {
        linksOk.push(link.status);
      } else if (link.status !== 200) {
        linksBroken.push(link.status);
      }
    });
    console.log("broken links:", linksBroken.length);
    console.log("unbroken links:", linksOk.length);
    console.log("----------------------------------------------------");
  });
  //return Promise
};

//  CLI opciones command line interface
const options = {
  one: process.argv[2],
  two: process.argv[3],
};

//F.07 función madre MD-LINKS
function main(file, options) {
  //  RUTA ABSOLUTA DE CARPETA
  const ruteAbsolute = path.resolve(file);
  //console.log(ruteAbsolute)
  const files = fs.readdirSync(file); 
  //console.log(files);
  const links = readFiles(files, ruteAbsolute);

  const option = []; //expresion
  if (options.two == undefined) {
    //statement
    option.push(options.one);
  } else if (options.two !== undefined) {
    option.push(options.one + " " + options.two);
  }

  option.forEach((option) => {
    if (option == "--validate" || option == "--v") {
      allLinksValidation(links);
      //linksValidatacion(links) /*linksValidatacion(links)*/
    } else if (option == "--stats" || option == "--s") {
      totalStats(links);
    } else if (
      option == "--stats --validate" ||
      option == "--s --v" ||
      option == "--v --s" ||
      option == "--validate --stats"
    ) {
      //caso 01
      // totalStats(links)
      // linksValidatacion(links)

      //caso 02

      totalStats(links);
      statsBrokenLinks(links);
    } else console.log(links);
  });
}
main("./files", options);


// Node, es un entorno de código abierto y multiplataforma que me permite crear aplicaciones y herramientas del lado del servidor mediante JavaScript. ... js son más fáciles de mantener sincronizados debido a que se usa un solo lenguaje, en ambos lados de la app.
// new define algo nevo. defines una nueva promesa, con resolve y reject