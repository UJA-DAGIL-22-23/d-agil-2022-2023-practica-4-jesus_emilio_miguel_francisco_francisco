/**
 * @file cola-spec.js
 * @description Fichero con TDD para probar todo lo relacionado con la clase Cola
 * @author Miguel Ángel Hurtado Molina <mahm0010@red.ujaen.es>
 */


// SPECS a probar

describe('Cola', function () {
    let cola;
  
    beforeEach(() => {
      cola = new Cola(3);
    });
  
    describe('encolar y desencolar', function () {
      it('debería encolar y desencolar correctamente', function () {
        cola.encolar('Elemento 1');
        cola.encolar('Elemento 2');
        expect(cola.desencolar()).toBe('Elemento 1');
        cola.encolar('Elemento 3');
        expect(cola.desencolar()).toBe('Elemento 2');
        expect(cola.desencolar()).toBe('Elemento 3');
      });
    });

    describe('tam', function () {
      it('debería devolver el tamaño correcto de la cola', function () {
        expect(cola.tam()).toBe(0);
        cola.encolar('Elemento 1');
        cola.encolar('Elemento 2');
        expect(cola.tam()).toBe(2);
        cola.desencolar();
        expect(cola.tam()).toBe(1);
      });
    });

    describe('estaVacia', function () {
      it('debería verificar si la cola está vacía correctamente', function () {
        expect(cola.estaVacia()).toBe(true);
        cola.encolar('Elemento 1');
        expect(cola.estaVacia()).toBe(false);
        cola.desencolar();
        expect(cola.estaVacia()).toBe(true);
      });
    });

    describe('obtenerElementos', function () {
      it('debería devolver un vector con todos los elementos de la cola', function () {
        cola.encolar('Elemento 1');
        cola.encolar('Elemento 2');
        cola.encolar('Elemento 3');
        expect(cola.obtenerElementos()).toEqual(['Elemento 1', 'Elemento 2', 'Elemento 3']);
      });
    });

    describe('borrar', function () {
      it('debería vaciar la cola', function () {
        cola.encolar('Elemento 1');
        cola.encolar('Elemento 2');
        cola.borrar();
        expect(cola.estaVacia()).toBe(true);
        expect(cola.tam()).toBe(0);
      });
    });

});
