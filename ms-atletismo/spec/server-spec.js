/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor ATLETISMO:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS ATLETISMO Home Page', (done) => {
      supertest(app)
        .get('/atletismo/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");
        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS ATLETISMO Acerca De', (done) => {
      supertest(app)
        .get('/atletismo/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");
        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve Juan Pérez al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/atletismo/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "Juan Pérez");
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
  })

  /**
   * Tests para probar la BBDD
   */
  describe('Probar la BBDD:', () => {
      it('Devuelve todos los atletas de la BBDD', (done) => {
        supertest(app)
        .get('/atletismo/getTodos')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert(res.body.hasOwnProperty('data'));
          assert(Array.isArray(res.body.data));
          assert(res.body.data.length > 0);
          assert(res.body.data[0].hasOwnProperty('data'));
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
        })
        .end((error) => { error ? done.fail(error) : done(); });
        });

      it('Devuelve el atleta con id "361633960436957388"', (done) => {
        supertest(app)
          .get('/atletismo/getAtletaPorId?id=361633960436957388')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            console.log(res.body.ref['@ref'].id)
            assert(res.body.ref['@ref'].id === "361633960436957388");
          })
          .end((error) => { error ? done.fail(error) : done(); });
      });
  })
});


