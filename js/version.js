/*
 * version.js
 * ----------
 * La versión del proyecto, en un solo lugar.
 *
 * La leen la interfaz (para mostrarla al pie), el generador del boletín (que
 * la deja escrita en los metadatos del audio) y cualquier herramienta de Node.
 * Si hay que cambiarla, se cambia acá y en CHANGELOG.md. En ningún otro lado.
 *
 * Criterio de numeración:
 *   - tercer número: correcciones y ajustes menores
 *   - segundo número: funcionalidad nueva o cambios visibles
 *   - primer número: cambio de fondo en el producto
 */
(function (global) {
  'use strict';

  var Canillita = global.Canillita = global.Canillita || {};

  Canillita.version = '1.30.6';

  /*
   * Qué edición es esta copia. Importa por una razón poco obvia: GitHub Pages
   * sirve todos los proyectos de una cuenta desde el mismo dominio, así que
   * dos despliegues distintos —en dos repos o en dos carpetas— comparten el
   * mismo localStorage.
   *
   * Sin un prefijo propio, abrir una demo después de la otra arrastra el
   * lector elegido, el tema, el paso del recorrido y la última visita. Y como
   * los lectores no se llaman igual en las dos ediciones, la barra queda sin
   * nadie seleccionado y las novedades salen vacías.
   */
  Canillita.edicion = 'global';

  /** Nombre completo de una clave de almacenamiento, con la edición adentro. */
  Canillita.clave = function (nombre) {
    return 'canillita.' + (Canillita.edicion || 'propia') + '.' + nombre;
  };

  /** Versión corta para mostrar en pantalla: 1.6.0 -> v1.6 */
  Canillita.versionLabel = function () {
    var partes = Canillita.version.split('.');
    return 'v' + partes[0] + '.' + partes[1];
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      version: Canillita.version,
      versionLabel: Canillita.versionLabel
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
