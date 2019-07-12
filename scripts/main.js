/**
 * Esta funcion es la que se ejecuta al cargar la pagina.
 * Dispara otras funciones.
 * @return {void}
 */
var hero

function iniciar() {
  menu.hide()
  $('#gameover').hide()
  inicializarElementos()
  mostrarSeleccionPersonaje()
}

/**
 * Busca todos los elementos que van a ser necesarios,
 * es decir, a los que vamos a acceder, y los guarda
 * en las variables que corresponden
 * @return {void}
 */
function inicializarElementos() {
  // Estos elementos corresponden a la pantalla de seleccion de personaje
  window.elemPantallaSeleccion = document.getElementById(
    "overlay-seleccion-personaje"
  )
  window.elemContenedorPersonajes = document.getElementById(
    "contenedor-personajes"
  )
  window.elemNombreDeUsuario = document.getElementById("nombre-de-usuario")

  // Estos corresponden al panel del jugador
  window.elemJugadorNombreUsuario = document.getElementById(
    "panel-nombre-usuario"
  )
  window.elemJugadorTipoPersonaje = document.getElementById(
    "panel-tipo-personaje"
  )
  window.elemJugadorEstadisticaAtaque = document.getElementById(
    "estadistica-ataque"
  )
  window.elemJugadorEstadisticaDefensa = document.getElementById(
    "estadistica-defensa"
  )
  window.elemJugadorEstadisticaVida = document.getElementById(
    "estadistica-vida"
  )
  window.elemJugadorEstadisticaMana = document.getElementById(
    "estadistica-mana"
  )
  window.elemJugadorHabilidades = document.getElementById(
    "habilidades-jugador"
  )

  // Estos corresponden al panel del enemigo
  window.elemEnemigoTipoPersonaje = document.getElementById(
    "enemigo-panel-tipo-personaje"
  )
  window.elemEnemigoEstadisticaAtaque = document.getElementById(
    "enemigo-estadistica-ataque"
  )
  window.elemEnemigoEstadisticaDefensa = document.getElementById(
    "enemigo-estadistica-defensa"
  )
  window.elemEnemigoEstadisticaVida = document.getElementById(
    "enemigo-estadistica-vida"
  )
  window.elemEnemigoEstadisticaMana = document.getElementById(
    "enemigo-estadistica-mana"
  )

  // Estos corresponden al juego en general
  window.elemHistorial = document.getElementById("juego-historial")
}

/**
 * Va a mostrar los personajes definidos en [globals.js]
 * en la pantalla de seleccion de personaje
 * @return {void}
 */
function mostrarSeleccionPersonaje() {
  // Recorremos el array que contiene los personajes definidos.
  personajes.forEach(function(personaje) {
    // Creamos un elemento 'li'
    let contenedorPersonaje = document.createElement("li")

    // Le agregamos la clase 'personaje'
    contenedorPersonaje.classList.add("personaje", "ui", "button")

    // Le agregamos el HTML correspondiente
    contenedorPersonaje.innerHTML = `
            <span>Jugar como</span>
            <strong>${personaje.tipo}</strong>`

    // Agregamos una escucha de evento para cuando se seleccione el personaje
    contenedorPersonaje.addEventListener("click", function() {
      seleccionarPersonaje(personaje)
    })

    // Insertamos el elemento, dentro del contenedor de personajes
    window.elemContenedorPersonajes.appendChild(contenedorPersonaje)
  })
}

/**
 * Se ejecuta cuando se selecciona el personaje.
 * Si todo esta bien, pasa a la pantalla del juego.
 * @return {void}
 */
function seleccionarPersonaje(personaje) {
  let alert = $("#alert")
  // Si no se ingreso un nombre de usuario,
  // mostrar una alerta y volver.
  if (!window.elemNombreDeUsuario.value) {
    alert
      .html(
        `
        <div class="ui warning message">
            <i class="icon warning"></i>
            Debes ingresar un nombre para tu personaje!
        </div>`
      )
      .show()
    alert.fadeOut(3000)
    return false
  }

  // Si se ingreso, se guarda en la propiedad
  // nombre del objeto 'jugador'. Y en la propiedad
  // 'personaje' del mismo objeto, se guarda el
  // personaje seleccionado.
  jugador.nombre = window.elemNombreDeUsuario.value
  jugador.personaje = personaje

  registrar(`${jugador.nombre} jugara como ${jugador.personaje.tipo}`)
  // Despues de esto, se muestra la pantalla del juego.
  mostrarPantallaJuego()
}

/**
 * Luego de que se ingresa al juego, se muestra la
 * pantalla inicial, donde, basicamente, se juega.
 * @return {void}
 */
function mostrarPantallaJuego() {
  nextTurn()
  // Mostramos el menu de habilidades
  menu.css("visibility", "visible")
  // Ocultamos la pantalla de seleccion de personaje
  $("#overlay-seleccion-personaje").transition("scale")

  // Selecciona el proximo enemigo
  siguienteEnemigo()

  // Mostramos los datos del persoaje
  actualizarValoresJugador()
  actualizarHabilidadesJugador()

  // Mostramos los datos del enemigo
  actualizarValoresEnemigo()
}

function actualizarHabilidadesJugador() {
  // Agregamos habilidades del personaje
  jugador.personaje.habilidades.forEach(function(value, index) {
    let action = jugador.personaje.habilidades[index].accion
    let boton = document.createElement("a")
    boton.classList.add("ui", "teal", "item")
    boton.addEventListener("click", function() {
      action()
    })
    boton.innerHTML = jugador.personaje.habilidades[index].nombre
    window.elemJugadorHabilidades.appendChild(boton)
  })
}

function actualizarValoresJugador() {
  $("#player_portrait")
    .children()
    .attr("src", jugador.personaje.estadisticas.portrait)
  window.elemJugadorNombreUsuario.innerHTML = jugador.nombre
  window.elemJugadorTipoPersonaje.innerHTML = jugador.personaje.tipo
  window.elemJugadorEstadisticaAtaque.innerHTML =
    jugador.personaje.estadisticas.ataque
  window.elemJugadorEstadisticaDefensa.innerHTML =
    jugador.personaje.estadisticas.defensa
  // Con Progress de semantic podemos actualizar una barra de vida o mana
  if(jugador.personaje.estadisticas.vida > 0){
      $("#player_lifebar").progress({
    percent:
      (jugador.personaje.estadisticas.vida * 100) /
      jugador.personaje.estadisticas.maxVida
  })
} else {
    menu.transition()
    $("#player_lifebar").progress({
        percent: 0
    })
    $('#juego').transition()
    $('#gameover').transition()
}
  $("#player_manabar").progress({
    percent:
      (jugador.personaje.estadisticas.mana * 100) /
      jugador.personaje.estadisticas.maxMana
  })
}

function actualizarValoresEnemigo() {
  $("#enemy_portrait")
    .children()
    .attr("src", enemigoActual.estadisticas.portrait)
  window.elemEnemigoTipoPersonaje.innerHTML = enemigoActual.tipo
  window.elemEnemigoEstadisticaAtaque.innerHTML =
    enemigoActual.estadisticas.ataque
  window.elemEnemigoEstadisticaDefensa.innerHTML =
    enemigoActual.estadisticas.defensa
  // Con Progress de semantic podemos actualizar una barra de vida o mana
  $("#enemy_manabar").progress({
    percent:
      (enemigoActual.estadisticas.mana * 100) /
      enemigoActual.estadisticas.maxMana
  })
  // Si el enemigo muere, lo descartamos y pasamos al siguiente
  if (enemigoActual.estadisticas.vida <= 0) {
    $("#enemy_lifebar").progress({
      percent: 0
    })
    $(".panel.enemigo .ui.card").transition("scale", 1000)
    siguienteEnemigo()
    setTimeout(function() {
      actualizarValoresEnemigo()
    }, 1700)

    $(".panel.enemigo .ui.card").transition("scale")
  } else {
    $("#enemy_lifebar").progress({
      percent:
        (enemigoActual.estadisticas.vida * 100) /
        enemigoActual.estadisticas.maxVida
    })
  }
}

/**
 * Selecciona un enemigo de la lista de enemigos
 * y lo enfrenta al jugador
 */
function siguienteEnemigo() {
  // Toma al primer enemigo de la lista en orden, falta crear lista independiente
  // con enemigos aleatorios, de otra manera los enemigos que reaparecen tienen
  // vida = 0 y eso genera recursividad
  if (enemigos.length > 0) {
    let enemigo = enemigos.shift()
    console.log(enemigo)
    enemigoActual = enemigo
    registrar(`El proximo enemigo es ${enemigo.tipo}`, false)
  } else {
    registrar(`No quedan más enemigos`, false)
  }
}

/**
 * Agrega un registro al historial
 */
function registrar(evento, jugador = true) {
  let d = new Date()
  let h = d
    .getHours()
    .toString()
    .padStart(2, "0")
  let m = d
    .getMinutes()
    .toString()
    .padStart(2, "0")
  let s = d
    .getSeconds()
    .toString()
    .padStart(2, "0")
  let hora = "[" + h + ":" + m + ":" + s + "]"
  let registro = document.createElement("li")
  // Si es true el color es azul si es false es rojo
  registro.style.color = jugador ? "#614ad3" : "#e42c64"
  registro.innerHTML = hora + " " + evento
  window.elemHistorial.appendChild(registro)
  scrollLog()
}

// Agregamos un listener, que escucha el evento
// 'DOMContentLoaded'. Se ejecuta cuando el DOM
// se cargo completamente. En este caso, ejecuta
// la funcion 'iniciar'
document.addEventListener("DOMContentLoaded", iniciar)
