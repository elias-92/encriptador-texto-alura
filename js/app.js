function procesarTexto(callback) {
  const inputText = document.querySelector('#encriptar').value.trim()

  if (inputText.length < 1) {
    alertModal('Por favor ingresa un texto', 'error-color')
    return
  }
  if (!caracteresEspeciales(inputText)) {
    alertModal(
      'El texto NO debe contener caracteres especiales, letras minúsculas y acentos.',
      'error-color'
    )
    return
  }

  // El callback seria quitarEncriptacion o agregarEncriptacion dependiendo del btn presionado
  const result = callback(inputText)

  // Obtén el contenedor de respuesta
  const respuestaContainer = document.querySelector('#respuestaContainer')

  // Crea un nuevo párrafo con el contenido resultante
  const nuevoParrafo = document.createElement('textarea')
  nuevoParrafo.classList.add('textarea-output')
  nuevoParrafo.textContent = result

  // Reemplaza el contenido del contenedor con el nuevo párrafo
  respuestaContainer.innerHTML = ''
  respuestaContainer.appendChild(nuevoParrafo)

  // Vacía el campo de texto
  document.querySelector('#encriptar').value = ''
}

// Event listener para el botón de encriptar
document.getElementById('encriptarBtn').addEventListener('click', function () {
  procesarTexto(agregarEncriptacion)
})

// Event listener para el botón de desencriptar
document.getElementById('desencriptarBtn').addEventListener('click', function () {
  procesarTexto(quitarEncriptacion)
})

// Función para aplicar la clave y encriptar el texto
function agregarEncriptacion(texto) {
  // Definir la clave de encriptación
  const clave = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat'
  }

  // Crear una expresión regular con todas las letras de la clave
  const regex = new RegExp(Object.keys(clave).join('|'), 'g')
  // Reemplazar cada letra por su equivalente en la clave
  return texto.replace(regex, (match) => clave[match])
}
// Función para deshacer la encriptación y obtener el texto original
function quitarEncriptacion(texto) {
  // Definir la clave de desencriptación
  const clave = {
    ai: 'a',
    enter: 'e',
    imes: 'i',
    ober: 'o',
    ufat: 'u'
  }

  // Crear una expresión regular con todas las palabras de la clave
  const regex = new RegExp(Object.keys(clave).join('|'), 'g')

  // Reemplazar cada palabra por su equivalente en la clave
  return texto.replace(regex, (match) => clave[match])
}
// Funcion para verificar carectere especiales, acentos y mayusculas
function caracteresEspeciales(texto) {
  return /^[a-z\s]+$/.test(texto)
}
// Funcion para copiar texto
async function copiarContenido() {
  const texto = document.querySelector('.textarea-output').value
  try {
    await navigator.clipboard.writeText(texto)
    alertModal('Contenido copiado al portapapeles', 'success-color')
  } catch (err) {
    alertModal('Error al copiar: ' + err, 'error-color')
  }
}
// Funcion para mostrar modal de alertas
function alertModal(message, color) {
  const showModal = document.getElementById('main')

  const alertContainer = document.createElement('div')
  alertContainer.classList.add('modal-container')

  const backgroundColor = document.createElement('div')
  backgroundColor.classList.add(color)
  alertContainer.appendChild(backgroundColor)

  const texto = document.createElement('p')
  texto.classList.add('modal-text')
  texto.textContent = message
  alertContainer.appendChild(texto)

  showModal.appendChild(alertContainer)

  // Agregar la clase 'active' después de un breve retraso
  setTimeout(() => {
    alertContainer.classList.add('active')
  }, 10)

  // Eliminar el modal y la clase 'active' después de 3000 milisegundos
  setTimeout(() => {
    alertContainer.classList.remove('active')
    showModal.removeChild(alertContainer)
  }, 3000)
}
