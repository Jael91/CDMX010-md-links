let fs = require('fs');
let path = require('path');
require('colors');
const fetch = require('node-fetch');

//  IDENTIFICAR MD E IMPRIMIRLOS
  function readFiles(files, absolutePath) {
    let links = [];
    //const arrayLinks = files.map(archivo => { // [[links], [links] ,  []]
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
   // ---> se podría usar reduce, pero se pierde el bucle, caunter <----
  // let uniqueLinks = 0; mandar traer los links validados y buscar el status
  // arreglo de link OK y otro de links rotos
  // verificar que el status sea = a 200
  //  hacer el fetch, contienen url y status, comparar el status de esos, si links.status ===200 empujar ese link al arreglo de broken links, .lenght. Primero como empujamos arreglos rotos u ok a cada uno de los arreglos.
  // let okLinks = 0;
  // let brokenLinks = 0;
    let allLinks = linksCollection.map(link => link.href);  // async para cuando no quiero detener el flujo de ejecucion
    const totalLinks = allLinks.length;  // la calculacion de los stats es sincrono 
    const uniqueLinks = [...new Set(allLinks)].length; //--> solo tiene una lista de elementos unicos, hacer un bucle que va a reducir un array y compara elementos
    let statsResult = {
      total: totalLinks,
      unique: uniqueLinks
    };
    // resolve(statsResult);
    // tenemos que hacer una validación
    console.log(statsResult);
    //los links o los links con la info de status
  // });
};

// return new Promise((resolve, reject) => { //  sobre uso de new Promise -- este es async

// const statsValidateOption = (links) => {
//   return new Promise((resolve, reject) => {
//     validateOption(links).then(link => {
//       let allLinks = link.map(link => link.href);
//       let statusLinks = links.map(link => link.response);
//       //console.log("statusLinks:", statusLinks);
//       let totalLinks = allLinks.length;
//       //console.log("totalLinks:", totalLinks);
//       uniqueLinks = [...new Set(allLinks)];
//       //console.log("uniqueLinks:", uniqueLinks);
//       brokenLinks += (statusLinks.toString().match(/FAIL/g));
//       //console.log("brokenLinks:", brokenLinks);
//       let statsResult = {
//         total: totalLinks,
//         unique: uniqueLinks.length,
//         broken: brokenLinks.length
//       }
//       //console.log("STATS RESULT 2:", statsResult);
//       if (brokenLinks === 0) {
//         statsResult = {
//           total: totalLinks,
//           unique: uniqueLinks.length,
//           broken: 0
//         }
//         resolve(statsResult);
//       } else {
//         brokenLinks = (statusLinks.toString().match(/FAIL/g)).length;
//         let statsResult = {
//           total: totalLinks,
//           unique: uniqueLinks.length,
//           broken: brokenLinks
//         }
//         resolve(statsResult);
//         //console.log("STATS RESULT:", statsResult);
//       }
//     }).catch(err => {
//       reject(err)
//       console.log(chalk.bold.red("ERROR VALIDATE STATS OPTION. TRY AGAIN"));
//     })
//   })
// }

function main () {
  //  RUTA ABSOLUTA DE CARPETA
  const ruteAbsolute = path.resolve('./files');
  //console.log(ruteAbsolute.red);
  //  VOLVER ABSOLUTO MIS LINKS y obtenerlos
  const files = fs.readdirSync('./files');
  //console.log(fileSync);
  const links = readFiles(files, ruteAbsolute);
  //console.log(links);

  linksValidatacion(links);
  // si hay stats no imprimir links tal cual, imprimir estadisticas
  // si hay validate, si hay stats y validate y si no hay nada 

  totalStats(links)

  //
}
main()