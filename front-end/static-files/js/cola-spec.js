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
  
    it('debería encolar y desencolar correctamente', function () {
      cola.encolar('Elemento 1');
      cola.encolar('Elemento 2');
      console.log("COLA");
      console.log(cola);
      expect(cola.desencolar()).toBe('Elemento 1');
      cola.encolar('Elemento 3');
      expect(cola.desencolar()).toBe('Elemento 2');
      expect(cola.desencolar()).toBe('Elemento 3');
    });

    it('debería devolver el tamaño correcto de la cola', function () {
        expect(cola.tam()).toBe(0);
        cola.encolar('Elemento 1');
        cola.encolar('Elemento 2');
        expect(cola.tam()).toBe(2);
        cola.desencolar();
        expect(cola.tam()).toBe(1);
      });

    it('debería verificar si la cola está vacía correctamente', function () {
        expect(cola.estaVacia()).toBe(true);
        cola.encolar('Elemento 1');
        expect(cola.estaVacia()).toBe(false);
        cola.desencolar();
        expect(cola.estaVacia()).toBe(true);
    });

});