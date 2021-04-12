// const mdLinks = require('../');
const readFiles = require('./../main');
const fileLinks = require('./../main');


describe('Obtener files', () => {
  it('debería ser una constante', () => {
    expect(readFiles).toBeDefined()
    //console.log('FIX ME!');
  });
  it('debería ser una función', () => {
    expect(typeof readFiles).toBe('object')
    //console.log('FIX ME!');
  });
  // it('si retorna los links', () => {
  //   expect([

  //   ])
  })

describe('Obtener links', () => {
  it('debería ser una constante', () => {
    expect(fileLinks).toBeDefined()
    //console.log('FIX ME!');
  });
  it('debería ser una variable', () => {
    expect(typeof fileLinks).toBe('object')
    //console.log('FIX ME!');
  });
  it('si retorna los links', () => {
    expect([
      'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
      'https://jestjs.io/docs/es-ES/getting-started',
      'https://pages.github.com/'
    ])
    .toEqual ([
      'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
      'https://jestjs.io/docs/es-ES/getting-started',
      'https://pages.github.com/'
    ]);
  })
});


// });

// describe('Obtener files', () => {
//   it('debería ser una variable', () => {
//     expect(readFiles).toBeDefined()
//     //console.log('FIX ME!');
//   });
//   it('debería ser una función', () => {
//     expect(typeof readFiles).toBe('object')
//     //console.log('FIX ME!');
//   });
//   it('si retorna los links', () => {
//     expect([

//     ])
//   })
// });



// const fileLinks = (data) => {
//   let linksCollection = [];
//   let regularExpression = /\bhttps?:\/\/\S+/gi;
//   linksCollection = data
//   .replace(/[{()}]/g, '')
//   .match(regularExpression);
//   return linksCollection || []; // --> la forma más ideomática de escribir esta idea
// };

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
