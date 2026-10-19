/*
 * personas.js
 * -----------
 * Lectores de ejemplo para mostrar la demo.
 *
 * No son cuentas ni usuarios: son configuraciones de preferencias con nombre.
 * Elegir una es exactamente lo mismo que si esa persona hubiera cargado sus
 * datos a mano. Por eso el efecto es real y no una simulación: cambia el
 * mismo `localStorage` que usa cualquier lector.
 *
 * Existen para responder en veinte segundos la pregunta más difícil de la
 * demo: "¿en qué se diferencia de un diario común?".
 *
 * Criterio para armar la lista: cada lector tiene que diferenciarse del
 * anterior en algo que se vea apenas cambia la pantalla. No alcanza con que
 * tengan temas distintos, porque la Ruta 22 y Vaca Muerta le interesan a casi
 * todo el valle y entonces tres portadas salen parecidas. Por eso cada uno
 * varía además en el formato, en cuánto tiempo tiene y en qué hilo sigue:
 *
 *   Carlos    energía + obra        texto y audio   3 min
 *   Sergio    producción del valle  solo audio      3 min
 *   Federico  la redacción entera   todos           5 min
 *   Mauro     la ciudad y la ruta   texto y audio   1 min
 *   Yo        configuración vacía   texto y audio   1 min
 *
 * Y cada uno sigue al menos un hilo distinto, así el cartel de "esto cambió
 * desde tu última visita" aparece en un lugar diferente según quién entre.
 *
 * Los perfiles describen qué lee cada uno y nada más. No llevan biografía ni
 * datos personales: son configuraciones de lectura con nombre, y conviene que
 * se lean así cuando la persona del nombre está sentada en la sala.
 */
(function (global) {
  'use strict';

  var Canillita = global.Canillita = global.Canillita || {};

  var PERSONAS = [
    {
      id: 'carlos',
      nombre: 'Carlos',
      rol: 'Energía y obra',
      descripcion: 'Vaca Muerta y la infraestructura que la acompaña: el caño, la ruta y los plazos.',
      prefs: {
        name: 'Carlos',
        locality: 'Neuquén',
        topics: ['vacamuerta', 'ruta22'],
        following: ['vacamuerta'],
        format: 'texto_audio',
        audioSeconds: 180,
        speechRate: 1
      }
    },
    {
      id: 'sergio',
      nombre: 'Sergio',
      rol: 'La producción del valle',
      descripcion: 'La fruta, el clima que la decide y la energía que mueve la economía de la región.',
      prefs: {
        name: 'Sergio',
        locality: 'Neuquén',
        topics: ['fruticultura', 'clima', 'vacamuerta'],
        following: ['fruticultura', 'clima'],
        format: 'audio',
        audioSeconds: 180,
        speechRate: 1
      }
    },
    {
      id: 'federico',
      nombre: 'Federico',
      rol: 'Dirige la redacción',
      descripcion: 'Ve todo lo que se publica, en todos los formatos. La edición completa, sin filtrar.',
      prefs: {
        name: 'Federico',
        locality: 'General Roca',
        topics: ['vacamuerta', 'ruta22', 'municipio', 'fruticultura', 'clima', 'deportes'],
        following: ['ruta22', 'vacamuerta', 'messi'],
        format: 'todos',
        audioSeconds: 300,
        speechRate: 1
      }
    },
    {
      id: 'mauro',
      nombre: 'Mauro',
      rol: 'La ciudad y la ruta',
      descripcion: 'Lo que pasa en Roca, cómo está el camino y el deporte. Poco tiempo, al grano.',
      prefs: {
        name: 'Mauro',
        locality: 'General Roca',
        topics: ['municipio', 'ruta22', 'deportes'],
        following: ['messi', 'ruta22'],
        format: 'texto_audio',
        audioSeconds: 60,
        speechRate: 1.15
      }
    },
    {
      id: 'yo',
      nombre: 'Yo',
      rol: 'Mi configuración',
      descripcion: 'Energía, lo que pasa en la ciudad y el estado del tiempo y las rutas.',
      prefs: {
        name: '',
        locality: '',
        topics: ['vacamuerta', 'municipio', 'clima'],
        following: [],
        format: 'texto_audio',
        audioSeconds: 60,
        speechRate: 1
      }
    }
  ];

  function todas() {
    return PERSONAS.slice();
  }

  function get(id) {
    var encontrada = PERSONAS.filter(function (p) { return p.id === id; });
    return encontrada.length ? encontrada[0] : null;
  }

  /** Cuál está activa, o null si el lector configuró lo suyo. */
  function activa() {
    return Canillita.preferences.get().persona || null;
  }

  /**
   * Aplica una persona: escribe sus preferencias como si las hubiera cargado
   * el propio lector. Devuelve la persona aplicada.
   */
  function aplicar(id) {
    var persona = get(id);
    if (!persona) return null;
    /*
     * lastVisit vuelve a cero: cada lector tiene su propia historia de
     * visitas. Sin esto, al cambiar de persona se arrastraba la visita del
     * anterior y las novedades quedaban vacías.
     */
    Canillita.preferences.set(Object.assign(
      { persona: id, lastVisit: null }, persona.prefs
    ));
    return persona;
  }

  /** Vuelve a una configuración propia, sin persona de ejemplo. */
  function limpiar() {
    Canillita.preferences.set({ persona: null });
  }

  Canillita.personas = {
    todas: todas,
    get: get,
    activa: activa,
    aplicar: aplicar,
    limpiar: limpiar
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Canillita.personas;
  }
})(typeof window !== 'undefined' ? window : globalThis);
