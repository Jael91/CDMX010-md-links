let fs = require('fs');
let path = require('path');
require('colors');
const fetch = require('node-fetch');
const { resolve } = require('path');
const process = require('process');
const cliCommand = process.argv;

//  F.01 IDENTIFICAR MD E IMPRIMIRLOS 
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

//  F.02 OBTENER LINKS
const fileLinks = (data) => {
  let linksCollection = [];
  let regularExpression = /\bhttps?:\/\/\S+/gi;
  linksCollection = data
  .replace(/[{()}]/g, '')
  .match(regularExpression);
  return linksCollection || []; // --> la forma más ideomática de escribir esta idea
};

//  F.03 VALIDAR LINKS
const linksValidatacion = (links) => {
  let allLinks = links.map((link) => {
    fetch(link)
      .then((response) => {
        let validate = {
          href: link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText,
        };
        console.log(validate);   
      })
      .catch((err) => {
        validate = {
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
  // return Promise.all(allLinks).then((newresponse) => {
  //   return newresponse;
  // });
};

//F.04 Estadisticas de TOTAL y UNIQUES -> totalStats()
const totalStats = linksCollection => {
  const totalLinks = linksCollection.length;  
  const uniqueLinks = [...new Set(linksCollection)].length; 
  //console.log(uniqueLinks)
  //const brokenLinks = linksValidatacion(linksCollection); //.filter(response => response.status == '404')
  //console.log(brokenLinks.then(response => { return response }));

  let statsResult = {
    total: totalLinks,
    unique: uniqueLinks,
    //broken: brokenLinks,
  };
  console.log(statsResult);
};

//F.05 LINKS ROTOS
// const totalStatsBroken = (links) => {
//   fileLinks(links) 
//   .then((links) => {
//     let counterFine = [];
//     let counterFail = [];
// linksCollection.forEach((link) => {
//       if(linksCollection.status == 200){
//         counterFine.push(linksCollection.status)
//       } else if(linksCollection.status != 200){
//         counterFail.push(linksCollection.push)
//       }
//       let statsResultBroken = {
//             broken: brokenLinks,
//           };
//           console.log(statsResultBroken, 'esta es la prueba');
//     })
//   })
// };

const options = {
  one: process.argv[2],
  two: process.argv[3]
}

//  f.06 esta es MD-LINKS
function main (file, options) {
  //  RUTA ABSOLUTA DE CARPETA
  const ruteAbsolute = path.resolve(file)/*('./files')*/;
  //console.log(ruteAbsolute)
  const files = fs.readdirSync(file)/*('./files')*/;
  //console.log(files);
  const links = readFiles(files, ruteAbsolute);

  // linksValidatacion(links);
  // totalStats(links);
  //console.log(links);

  const option = [];
        if (options.two == undefined) {
            option.push(options.one)
        } else if(options.two !== undefined){
            option.push(options.one +" "+ options.two)
        };

        option.forEach(option => {
          if (option == '--validate') {
            linksValidatacion(links)
          } else if (option == '--v') {
            linksValidatacion(links)
          } else if (option == '--s') {
            totalStats(links)
          } else if(option == '--stats') {
            totalStats(links)
          } else if(option == '--stats --validate') {
            //DEBERIAN SER LOS ROTOS  como totalStats(links) pero incluyendo los rotos
          } else if(option == '--s --v') {
            //DEBERIAN SER LOS ROTOS  como totalStats(links) pero incluyendo los rotos
          } else 
            console.log(links);
          
    });
}

main('./files', options)