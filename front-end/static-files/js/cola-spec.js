/**
 * @file cola-spec.js
 * @description Fichero con TDD para probar todo lo relacionado con la clase Cola
 * @author Miguel Ángel Hurtado Molina <mahm0010@red.ujaen.es>
 */


// SPECS a probar

describe('Cola', () => {
    let cola;
  
    beforeEach(() => {
      cola = new Cola(3);
    });
  
    it('debería encolar y desencolar correctamente', () => {
      cola.encolar('Elemento 1');
      cola.encolar('Elemento 2');
      expect(cola.desencolar()).toBe('Elemento 1');
      cola.encolar('Elemento 3');
      expect(cola.desencolar()).toBe('Elemento 2');
      expect(cola.desencolar()).toBe('Elemento 3');
    });

    it('debería devolver el tamaño correcto de la cola', () => {
        expect(cola.tam()).toBe(0);
        cola.encolar('Elemento 1');
        cola.encolar('Elemento 2');
        expect(cola.tam()).toBe(2);
        cola.desencolar();
        expect(cola.tam()).toBe(1);
      });

});