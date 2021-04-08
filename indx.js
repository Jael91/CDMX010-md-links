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
