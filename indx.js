let fs = require('fs');
let path = require('path');
require('colors');
const fetch = require('node-fetch');
const { resolve } = require('path');
//const { fail } = require('assert');
const process = require('process');
// const {algo}= require('./helpersito')
const cliCommand = process.argv;
// console.log(cliCommand)
// console.log(cliCommand[3])

//  F.01 IDENTIFICAR MD E IMPRIMIRLOS 
  function readFiles(files, absolutePath) {
    let links = [];
    files.forEach(archivo => { 
      const join = path.join(absolutePath, archivo);
      const extension = path.extname(join);
      if ( extension === '.md' ) {
        let data = fs.readFileSync(join, 'utf8');
        const newLinks = fileLinks(data);
        //console.log(newLinks, 'newwwwww links'); --> acá
        links = links.concat(newLinks);
        //console.log(newLinks); // --> obtener links acá
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

//F.03 VALIDACION DE LINKS -> es la única asíncrona la de la validación
// const linksValidatacion = ( links ) => {
//   const promesa = links.map( link => fetch( link ) // ---> estoy llamando fetch por cada link, podría usar promise.all con este array de promesas, para hacer algo cuando todas las fetch cumplen
//   .then((response) => {
//       return ({ 
//       href: link, status: response.status ? 'OK' : 'FAIL'});
//     })
//   .catch((error) =>{
//     console.log(error)
//     return { href: link, status:'FAIL' }
//   })
// )
// console.log(promesa, 'ESTA ES LA PROMESA')
// console.log('esto es una pROMESA', Promise.all(promesa).then(response => { return response }))
// return Promise.all(promesa).then(response => { return response });
// };
//console.log(linksValidatacion);
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
        //return validate;    
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


//console.log(linksValidatacion);
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
        return validate;    
      })
      .catch((err) => {
        validate = {
          href: err.link,
          text: "text",
          path: "path",
          status: response.status,
          statusText: response.statusText,
        };
        //return validate;
      });
      //return allLinks
  });
  // return Promise.all(allLinks).then((newresponse) => {
  //   return newresponse;
  // });
};
//F.04 Estadisticas de TOTAL y UNIQUES -> totalStats()
const totalStats = linksCollection => {
  // console.log(linksCollection, 'jojojojojojo');
  //let allLinks = linksCollection.map(link => link.href);  
  //console.log(allLinks, 'OOOO')
  const totalLinks = linksCollection.length;  
  //console.log(totalLinks)
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

const options = {
  one: process.argv[2],
  two: process.argv[3]
}

// const options = {
//   firstOption: process.argv[2],
//   two: process.argv[3]
// }

//  esta es MD-LINKS
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
          // if (option == '--v' || '--validate') {
          //   linksValidatacion(links)
          // } else if (option == '--stats' || '--s') {
          //   totalStats(links)
          // }
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
          }

          // if (option == '--validate' ) {
          //   linksValidatacion(links)
          // } else if (option == '--stats' ) {
          //   totalStats(links)
          // }
});


}

main('./files', options)



// const cli = (file, options) => {
//  const result = fs.readFileSync(files)
//   if(link.argv.includes('--stats')){
//     let counterOk = [];
//     // let counterFail = [];
  
//     result.forEach((link) => {
//       if(link.status == 200){
//         counterOk.push(link.status);
//       }else if(link.status != 200){
//         counterFail.push(link.status);
//       }
//     })
//   }

  //const promises = links.map((link) => validateLink(link));

  // linksStatus(promises);

  // statsLink(promises);


  // if(link.argv.includes('--stats')){
  //   let counterOk = [];
  //   let counterFail = [];
  
  //   result.forEach((link) => {
  //     if(link.status == 200){
  //       counterOk.push(link.status);
  //     }else if(link.status != 200){
  //       counterFail.push(link.status);
  //     }
  //   })
  // }
//}


//  CLI 

// VALIDACION QUE ESTE CORRECTA

//  QUE IMPRIMA TODOS LOS LINKS





//F.05   {
  // const linksStatus = (promises) => {
  //   Promise.all(promises)
  //   .then((response) => {
  //     response.map((response) => {
  //       if(response.status === "OK"){
  //         console.log(response.href.green, response.status);
  //       }
  //       else{
  //         console.log(response.href.red, response.status)
  //       }
  //     })
  //   });
  // }
  
  // const validateLink = (link) =>
  // fetch(link)
  // .then((response) => {
  //   return {href: link, status: response.status ? 'OK' : 'FAIL'};
  // })
  // .catch((error) =>{
  //   console.log(error)
  //   return { href: link, status:'FAIL' }
  // });
  
  // const statsLink = (promises) => {
  //   Promise.all(promises)
  //     .then((response) => {
  //       const totalLinks = response.length;
  //       const uniqueLinks = [...new Set(response)].length;
  //       console.log(uniqueLinks);
  //       console.log(totalLinks);
  //       //let linksOkAll = [];
  //       let linksOK = 0;
  //       let linksFail = 0;
  //       response.forEach((response) => {
  //         if(response.status === 'OK'){
  //           //linksOkAll.push(linksOK++);
  //           linksOK ++;
  //           console.log('links:', linksOK);
  //         } else {
  //           linksFail ++;
  //           console.log('links Fail:', linksFail);
  //         }
  //       })
  //     })
  //       .catch((error) =>{
  //         console.log(error).red;
  //       });
      //     let statsResult = {
      //     total: totalLinks,
      //     unique: uniqueLinks,
      //     broken: brokenLinks.length
          
      // };
    // console.log(statsResult);
    // console.log(allLinks).red;//  };
