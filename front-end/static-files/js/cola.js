/**
 * @file cola.js
 * @description Implementa la funcionalidad de una cola (queue) con tamaño maximo
 * @author Miguel Ángel Hurtado Molina <mahm0010@red.ujaen.es>
 */


/**
 * @class Cola
 * @classdesc Implementación de una cola con tamaño máximo.
 */
class Cola {

    /**
     * Crea una instancia de la clase Cola.
     * @constructor
     * @param {number} maxTam - Tamaño máximo de la cola.
     */
    constructor(maxTam) {
        this.cola = [];
        this.maxTam = maxTam;
    }
  
    /**
     * Añade un elemento a la cola. Si la cola está llena, se elimina el primer elemento.
     * @param {*} data - Elemento a añadir a la cola.
    */
    encolar(data) {
        if (this.cola.length === this.maxTam) {
            this.cola.shift(); // Eliminar el primer elemento si la cola está llena
        }
        this.cola.push(data);
    }
  
    /**
     * Elimina y devuelve el primer elemento de la cola.
     * @returns {*} El primer elemento de la cola.
     */
    desencolar() {
        return this.cola.shift(); // Devolver y eliminar el primer elemento de la cola
    }

    /**
     * Devuelve el tamaño actual de la cola.
     * @returns {number} El tamaño actual de la cola.
     */
    tam() {
        return this.cola.length;
    }
    
    /**
     * Comprueba si la cola está vacía.
     * @returns {boolean} `true` si la cola está vacía, de lo contrario, `false`.
     */
    estaVacia() {
        return this.cola.length === 0;
    }

    /**
     * Obtiene un vector con todos los elementos de la cola.
     * @returns {Array} Un vector con todos los elementos de la cola.
     */
    obtenerElementos() {
        return [...this.cola];
    }

    /**
     * Vacía la cola, eliminando todos los elementos.
     */
    borrar() {
        this.cola = [];
    }
  }
  