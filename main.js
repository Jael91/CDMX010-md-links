let fs = require('fs');
let path = require('path');
require('colors');
const fetch = require('node-fetch');
const { resolve } = require('path');
const process = require('process');
const cliCommand = process.argv;
const chalk = require('chalk');

//  F.01 Identifica mis MD y los imprime 
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

//  F.02 Obtiene mi array con TODOS los links
const fileLinks = (data) => {
  let linksCollection = [];
  let regularExpression = /\bhttps?:\/\/\S+/gi;
  linksCollection = data
  .replace(/[{()}]/g, '')
  .match(regularExpression);
  return linksCollection || []; // --> la forma más ideomática de escribir esta idea
};

//  F.03 Esta función la utilizo en mis estadísticas
const linksValidatacion = (links) => {
  let allLinks = links.map(link => {
    return fetch(link)
      .then((response) => {
        let validate = {
          href: link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText,
        };
       // console.log(validate); 
        return validate;    
      })
      .catch((err) => {
        let validate = {       
          href: err.link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText,
        };
        //console.log(validate); 
        return validate;
      });
      //return allLinks
  });
   return Promise.all(allLinks)

  // .then(response => statsBrokenLinks(response))
  // .catch(err => console.log(err))
};

//  F.04 Valida todos mis links
const allLinksValidation = (links) => {
  let allLinks = links.map(link => {
    return fetch(link)
      .then((response) => {
        let validate = {
          href: link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText,
        };
        console.log('----------------------------------------------------');
        console.log("Results for your link's validation:".inverse.yellow);
        console.log(' ');
        //console.log(validate); 
        console.log('href:', validate.href); 
        console.log('text:', validate.text); 
        console.log('path:', validate.path); 
        console.log('status:', validate.status); 
        console.log('statusText:', validate.statusText); 
        // console.log('----------------------------------------------------');
        //return validate;    
      })
    })
}

//  F.05 Estadísticas para links unicos y totales
const totalStats = linksCollection => {
  const totalLinks = linksCollection.length;  
  const uniqueLinks = [...new Set(linksCollection)].length; 
  //const brokenLinks = (mockObject) => mockObject.filter((obj) => obj.statusText === "FAIL").length;
  //console.log(uniqueLinks)
  //const brokenLinks = linksValidatacion(linksCollection); //.filter(response => response.status == '404')
  //console.log(brokenLinks.then(response => { return response }));

  let statsResult = {
    total: totalLinks,
    unique: uniqueLinks,
    //broken: brokenLinks,
  };
  // console.log('Result of the statistics of your links:'.inverse.cyan);
  console.log('----------------------------------------------------');
  console.log("Results for your link's stadistics:".inverse.cyan);
  console.log(' ');
  console.log('total links:', statsResult.total); 
  console.log('unique links:', statsResult.unique); 
  console.log('----------------------------------------------------');
};


//F.06 Estadisticas para LINKS ROTOS
const statsBrokenLinks = (links) => {
  linksValidatacion(links)
  .then((links) => { 
    let linksBroken = [];
    let linksOk = [];
    //console.log(linksBroken);
    links.forEach((link) => {
      //console.log(link);
      if (link.status == 200){
        linksOk.push(link.status)
      }else if (link.status !== 200){
        linksBroken.push(link.status)
      }
    })
    console.log('broken links:', linksBroken.length,); 
    console.log('unbroken links:', linksOk.length,)
    //console.log('{ broken:', linksBroken.length,',', 'complete:', linksOk.length,' }')
    console.log('----------------------------------------------------');
  })
  //return Promise
}

//  CLI opciones
const options = {
  one: process.argv[2],
  two: process.argv[3]
}

//F.07 función madre MD-LINKS
function main (file, options) {
  //  RUTA ABSOLUTA DE CARPETA
  const ruteAbsolute = path.resolve(file)/*('./files')*/;
  //console.log(ruteAbsolute)
  const files = fs.readdirSync(file)/*('./files')*/;
  //console.log(files);
  const links = readFiles(files, ruteAbsolute);

  const option = [];
        if (options.two == undefined) {
            option.push(options.one)
        } else if(options.two !== undefined){
            option.push(options.one +" "+ options.two)
        };

        option.forEach(option => {
          if (option == '--validate' || option == '--v') {
            allLinksValidation(links)
            //linksValidatacion(links) /*linksValidatacion(links)*/ 
          } else if (option == '--stats' || option == '--s') {
            totalStats(links)
          } else if(option == '--stats --validate' || option == '--s --v' || option == '--v --s' || option == '--validate --stats') {
           //caso 01
            // totalStats(links)
            // linksValidatacion(links)

            //caso 02
            statsBrokenLinks(links)
            totalStats(links)
          } else 
          // console.log("Here all the links you have in your MD files:".inverse.magenta);
          console.log(links);      
        });
}

main('./files', options)






//F.05 Estadisticas para LINKS ROTOS  este es el que va con promisseALL-----CON ANDI-----
// const statsBrokenLinks = (allLinks) => {
//   /*linksValidatacion(links) */
//   /*.then((links) => { */
//     let linksBroken = [];
//     let linksOk = [];
//     //console.log(linksBroken);
//     allLinks.forEach((link) => {
//       //console.log(link);
//       if (link.status == 200){
//         linksOk.push(link.status)
//       }else if (link.status !== 200){
//         linksBroken.push(link.status)
//       }
//     })
//     console.log('{ broken links:', linksBroken.length, 'links ok:', linksOk.length,' }')
//   }





//  _________________________________



//  F.03.2 Valida mis links
// const linksValidatacion = (links) => {
//   let arrLinks = links.map(link => {
//       return fetch(link)
//       .then((response) => {
//        let infoLink = {
//           href: link,
//           text: "text",
//           path: "path",
//           status: response.status,
//           statusText: response.statusText
//         };
//         return infoLink;
//       })
//       .catch((err) => {
//        let infoMistakeLink = {          
//           url:link,
//           error:err.code,
//           status:err.status,
//       }
//       return infoMistakeLink;
//       })
//       })
//   return Promise.all(arrLinks)
// .then(response => /*console.log(*/statsBrokenLinks(response))
//     .catch(err => console.log(err))
// };


/// __________________________


//  F.03 Valida mis links     OKOKOKOKOKOOKOKOKOKO MIO
// const linksValidatacion = (links) => {
//   let allLinks = links.map((link) => {
//     return fetch(link)
//       .then((response) => {
//         let validate = {
//           href: link,
//           text: "text",
//           path: "path",
//           status: response.status,
//           statusText: response.statusText,
//         };
//         console.log(validate); 
//         return validate;    
//       })
//       .catch((err) => {
//         let validate = {          
//           href: err.link,
//           text: "text",
//           path: "path",
//           status: response.status,
//           statusText: response.statusText,
//         };
//         //console.log(validate); 
//         return validate;
//       });
//       //return allLinks
//   });
//   return Promise.all(allLinks);
// };







    //broken: statsBrokenLinks(links),
  /*broken : statsBrokenLinks(links),*/ 
  //broken: brokenLinks
  //broken: brokenLinks,



    //console.log(uniqueLinks)
  //const brokenLinks = linksValidatacion(linksCollection); //.filter(response => response.status == '404')
  //console.log(brokenLinks.then(response => { return response }));