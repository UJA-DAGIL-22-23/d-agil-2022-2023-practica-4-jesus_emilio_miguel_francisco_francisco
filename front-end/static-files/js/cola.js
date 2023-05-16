/**
 * @file cola.js
 * @description Implementa la funcionalidad de una cola (queue) con tamaño maximo
 * @author Miguel Ángel Hurtado Molina <mahm0010@red.ujaen.es>
 */


class Cola {
    constructor(maxTam) {
      this.cola = [];
      this.maxTam = maxTam;
    }
  
    encolar(data) {
      if (this.cola.length === this.maxTam) {
        this.cola.shift(); // Eliminar el primer elemento si la cola está llena
      }
      this.cola.push(data);
    }
  
    desencolar() {
      return this.cola.shift(); // Devolver y eliminar el primer elemento de la cola
    }
  }
  