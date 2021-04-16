// const mdLinks = require('../');
const arrayLinksValidated = require('./../dataProof');
const readFiles = require('./../main');
const fileLinks = require('./../main');
const linksValidatacion = require('./../main');
const totalStats = require('./../main');
const statsBrokenLinks = require('./../main');
const allLinksValidation = require('./../main');

describe('Obtener files', () => {
  it('debería ser una constante', () => {
    expect(readFiles).toBeDefined()
    //console.log('FIX ME!');
  });
  it('debería ser una función', () => {
    expect(typeof readFiles).toBe('object')
    //console.log('FIX ME!');
  });
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

it('Debe validar links', () => linksValidatacion(arrayLinksValidated).then((data) => {
  expect(data).toEqual({ status: 200, text: 'FAIL', url: 'https://otra-cosa.net/algun-doc.html' })/*({" href:'https://jjjj', text:'text', path:'path'"})*/;
}));

describe('Obtengo esdísticas unicas y totales', () => {
  it('debería ser una constante', () => {
    expect(totalStats).toBe('object')
    //console.log('FIX ME!');
  });
  it('muestra estadisticas', () => {
    expect(typeof totalStats).toBe({})
    //console.log('FIX ME!');
  });
})

describe('Obtengo esdísticas unicas y totales', () => {
  it('debería ser una constante', () => {
    expect(totalStats).toBe('object')
    //console.log('FIX ME!');
  });
  it('muestra estadisticas', () => {
    expect(typeof totalStats).toBe({})
    //console.log('FIX ME!');
  });
})

describe('Obtengo links rotos', () => {
  it('debería ser una constante', () => {
    expect(statsBrokenLinks).toBe('object')
    //console.log('FIX ME!');
  });
  it('muestra estadisticas de links rotos', () => {
    expect(typeof statsBrokenLinks).toBe({})
    //console.log('FIX ME!');
  });
})

it('Debe todos validar links', () => allLinksValidation(arrayLinksValidated).then((data) => {
  expect(data).toEqual({ status: 200, text: 'FAIL', url: 'https://otra-cosa.net/algun-doc.html' })/*({" href:'https://jjjj', text:'text', path:'path'"})*/;
}));
