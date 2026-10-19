/*
 * tema.js
 * -------
 * Dos identidades para la misma aplicación.
 *
 *   'propio'  Tu Canillita como producto independiente.
 *   'grupo'   Tu Canillita como capa sobre la redacción de Río Negro.
 *
 * No es un rediseño ni una copia de la marca del diario: el ocre, la
 * tipografía y los componentes siguen siendo los del producto. Lo que cambia
 * es un acento —el rojo de la cabecera de Río Negro— y la aparición del
 * origen de cada contenido.
 *
 * El identificador del tema sigue siendo 'grupo' y el parámetro sigue siendo
 * `?grupo=1`. Es deliberado: el QR impreso apunta ahí y renombrarlo lo
 * rompería sin que nadie gane nada.
 *
 * Todo el color vive en variables CSS. Cambiar de tema es poner un atributo
 * en <html>; no hay una segunda hoja de estilos ni una segunda aplicación.
 */
(function (global) {
  'use strict';

  var Canillita = global.Canillita = global.Canillita || {};
  var CLAVE = Canillita.clave ? Canillita.clave('tema') : 'canillita.tema';

  /*
   * El ecosistema de medios de Río Negro. Son tres bocas de una sola
   * redacción, no tres marcas que haya que conciliar: por eso el tema necesita
   * un solo acento.
   */
  var MARCAS = [
    { id: 'diario',   nombre: 'Diario Río Negro', tipo: 'diario'  },
    { id: 'radio',    nombre: 'Río Negro Radio',  tipo: 'radio'   },
    { id: 'podcasts', nombre: 'Podcasts',         tipo: 'podcast' }
  ];

  var TEMAS = {
    propio: {
      id: 'propio',
      etiqueta: '',
      bajada: 'Noticias del valle, todos los días',
      marcas: []
    },
    grupo: {
      id: 'grupo',
      etiqueta: 'Edición Río Negro',
      bajada: 'Con el periodismo de Río Negro, desde 1912',
      marcas: MARCAS
    }
  };

  function leer() {
    try {
      return global.localStorage.getItem(CLAVE) || 'propio';
    } catch (error) {
      return 'propio';
    }
  }

  function guardar(id) {
    try {
      global.localStorage.setItem(CLAVE, id);
    } catch (error) { /* sin almacenamiento, el tema dura la sesión */ }
  }

  var activo = 'propio';

  function actual() {
    return TEMAS[activo] || TEMAS.propio;
  }

  function esGrupo() {
    return activo === 'grupo';
  }

  function marcas() {
    return actual().marcas.slice();
  }

  /** Busca una marca por su nombre, como viene escrito en el contenido. */
  function marca(nombre) {
    var encontrada = MARCAS.filter(function (m) { return m.nombre === nombre; });
    return encontrada.length ? encontrada[0] : null;
  }

  /** Aplica el tema: un atributo en <html> y listo. */
  function aplicar(id) {
    activo = TEMAS[id] ? id : 'propio';
    global.document.documentElement.setAttribute('data-tema', activo);
    guardar(activo);
    return actual();
  }

  function alternar() {
    return aplicar(esGrupo() ? 'propio' : 'grupo');
  }

  /**
   * Decide el tema al cargar la página.
   * `?grupo=1` lo enciende; `?grupo=0` lo apaga. Sin parámetro, se respeta lo
   * último elegido.
   */
  function init() {
    var pedido = Canillita.router && Canillita.router.param('grupo');
    if (pedido === '1') return aplicar('grupo');
    if (pedido === '0') return aplicar('propio');
    return aplicar(leer());
  }

  Canillita.tema = {
    init: init,
    aplicar: aplicar,
    alternar: alternar,
    actual: actual,
    esGrupo: esGrupo,
    marcas: marcas,
    marca: marca
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Canillita.tema;
  }
})(typeof window !== 'undefined' ? window : globalThis);
