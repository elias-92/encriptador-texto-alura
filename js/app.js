function procesarTexto(callback) {
  const inputText = document.querySelector('#encriptar').value

  if (!caracteresEspeciales(inputText)) {
    alert('El texto NO debe contener caracteres especiales, letras minúsculas y acentos.')
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
function caracteresEspeciales(texto) {
  return /^[a-z\s]+$/.test(texto)
}
async function copiarContenido() {
  const texto = document.querySelector('.textarea-output').value
  try {
    await navigator.clipboard.writeText(texto)
    alert('Contenido copiado al portapapeles')
  } catch (err) {
    alert('Error al copiar: ', err)
  }
}
