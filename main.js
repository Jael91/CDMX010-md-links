let fs = require('fs');
let path = require('path');
require('colors');
const fetch = require('node-fetch');

//  IDENTIFICAR MD E IMPRIMIRLOS
  function readFiles(files, absolutePath) {
    let links = [];
    files.forEach(archivo => { 
      const join = path.join(absolutePath, archivo);
      const extension = path.extname(join);
      if ( extension === '.md' ) {
        let data = fs.readFileSync(join, 'utf8');
        const newLinks = fileLinks(data);
        links = links.concat(newLinks);
      };
    });
    return links;
  };

//  OBTENER LINKS
const fileLinks = (data) => {
  let linksCollection = [];
  let regularExpression = /\bhttps?:\/\/\S+/gi;
  linksCollection = data
  .replace(/[{()}]/g, '')
  .match(regularExpression);
  return linksCollection || []; // --> la forma más ideomática de escribir esta idea
};

// VALIDACION DE LINKS
const linksValidatacion = ( links ) => {
  links.map( link => fetch( link ) // ---> estoy llamando fetch por cada link, podría usar promise.all con este array de promesas, para hacer algo cuando todas las fetch cumplen
  .then((response) => {
      return ({ 
      href: link, status: response.status /*? 'OK' : 'rechazado'*/});
    })
  .catch((error) =>{
    //console.log(error)
    return { href: url, status:'rechazado' }
  }) 
)};

//Estadisticas de TOTAL y UNIQUES -> totalStats()
const totalStats = linksCollection => { // i.v. no va a trabajar con promesas, si la de md links
    let allLinks = linksCollection.map(link => link.href);  // async para cuando no quiero detener el flujo de ejecucion
    const totalLinks = allLinks.length;  // la calculacion de los stats es sincrono 
    const uniqueLinks = [...new Set(allLinks)].length; //--> solo tiene una lista de elementos unicos, hacer un bucle que va a reducir un array y compara elementos
    let statsResult = {
      total: totalLinks,
      unique: uniqueLinks,
    };
    console.log(statsResult);
};

function main () {
  //  RUTA ABSOLUTA DE CARPETA
  const ruteAbsolute = path.resolve('./files');
  //  VOLVER ABSOLUTO MIS LINKS y obtenerlos
  const files = fs.readdirSync('./files');
  //console.log(fileSync);
  const links = readFiles(files, ruteAbsolute);
  //console.log(links);
  linksValidatacion(links);
  totalStats(links)
}
main()







// --> md links que regresa promesa, acepta 1 path y otro es un objeto de opciones que solo tiene objeto validate. Se resuelve con un [] de links








//  cómo llamar las funciones, bucle infinito de llamadas, la pila de llamadas, satura la app
//  tenemos variables en la parte superior, la variable va mutando de valor, se llama condicion de carrera
//  todavía mi variable no tiene ese valor. NO ES BUENA PRACTICA. No variables globales. 
//  function main, leer archivo, transformar ruta absoluta, uno trás otro. 

// aprovechar PARÁMETROS Y ARGUMENTOS en las funciones, pensar cuáles son nuestros parámetros
// ejem readFiles(files)  -> nuestro código se ejecuta de forma secuencial
// tener una función MAIN, nos da órden de qué es importante y qué se ejecuta después
// MAP MAP MAP, entenderlo bien, la manipulación de arreglos (la meta función de la manipulación de arr)
// forEach -> qué es lo que me está retornando, nada, undefined. 
// diferencia entre MAP y forEach
// cómo nos apoyamos en variables para acumular valores
// cocat() -> cómo funciona y qué retorna
// " || entender la TABLA DE LA VERDAD js, el operador OR "
// hay códigos en los que no hay ninguna comparación



// const linksValidatacion = ( links ) => {
//   // let linksCollection = [];
//   let promises = links.map( item => fetch(item))
//   //console.log(promises)
//   //return Promise.all(promises)
//   .then((response) => {
//    console.log(response)
//     // return console.log('status', { 
//     //   href: url, status: response
//     //   .status /*? 'OK' : 'rechazado'*/});
//     })
//   .catch((error) =>{
//     console.log(error)
//     return{ href: url, status:'rechazado' }
//   }) 
// };

// console.log(linksValidatacion(readFiles));






