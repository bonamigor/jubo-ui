const caracteresInvalidos = ['.', '/', '(', ')', '-']

const isCaracterInvalido = caracter => {
  return caracteresInvalidos.includes(caracter)
}

export const cleanInput = (texto) => {
  const array = texto.split('')
  const novoArray = array.filter((caracter) => {
    return !isCaracterInvalido(caracter)
  })
  const novaString = novoArray.join('')
  return novaString
}
