let fs = require('fs');
let path = require('path');
require('colors');
const fetch = require('node-fetch');
//const { fail } = require('assert');

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

//F.03 VALIDACION DE LINKS -> es la única asíncrona la de la validación
const linksValidatacion = ( links ) => {
  links.map( link => fetch( link ) // ---> estoy llamando fetch por cada link, podría usar promise.all con este array de promesas, para hacer algo cuando todas las fetch cumplen
  .then((response) => {
      return ({ 
      href: link, status: response.status ? 'OK' : 'FAIL'});
    })
  .catch((error) =>{
    console.log(error)
    return { href: link, status:'FAIL' }
  }) 
)};

//  F.04 Estadisticas de TOTAL y UNIQUES -> totalStats()
const totalStats = linksCollection => {
  let allLinks = linksCollection.map(link => link.href);  
  const totalLinks = allLinks.length;  
  const uniqueLinks = [...new Set(allLinks)].length; 
  const brokenLinks = linksCollection.map(link => link.status);

  let statsResult = {
    total: totalLinks,
    unique: uniqueLinks,
    broken: brokenLinks.length,
    //status: 404,
    //statusText: 'FAIL',
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

//   const promises = links.map((link) => validateLink(link));
//   linksStatus(promises);

  //totalStats(links);
  //statsLink(promises);
}
main()

//  CLI 

// VALIDACION QUE ESTE CORRECTA

//  QUE IMPRIMA TODOS LOS LINKS


//------------------- FUNCION A DESARROLLAR ------------------------

//Validar los links con sus status NUEVA FUNCION
// const validateOption = links => {
//     let statusLinks = links.map(link => { //  arreglo de promesas para consolidar en 1 promesa
//       // links.map(link => {
//       return fetch(link.href).then(response => { //  retorna una promesa
//         if (response.status === 200) {
//           link.status = response.status;
//           link.response = "O.K.";
//         } else {
//           link.status = response.status;
//           link.response = response.statusText;
//           link.response = "FAIL";
//         }
//       });
//     });
//     Promise.all(statusLinks).then(response => {
//       resolve(links);
//     }).catch(err => {
//       //reject(err)
//       links.status = null;
//       links.response = "FAIL";
//       resolve(links);
//     });
//  // });
// };

// console.log(validateOption)

//------------------- FUNCION A DESARROLLAR 02 ------------------------

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



//------------------- NOTAS PARA ESTUDIAR ------------------------

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







// F.05   {
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
//       response.map((response) => {
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
//         let statsResult = {
//         total: totalLinks,
//         unique: uniqueLinks,
//         broken: brokenLinks.length
        
//     };
//   console.log(statsResult);
//   console.log(allLinks).red;
//   };
//  }







