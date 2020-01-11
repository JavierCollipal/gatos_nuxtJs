// ts-ignore because we doesn't have V types
const catName = [
  // @ts-ignore
  v => !!v || 'Nombre es requerido',
  // @ts-ignore
  v => v.length <= 100 || 'No mas de 100 caracteres'
]
const catAge = [
  // @ts-ignore
  v => v.length <= 100 || 'No mas de 100 años'
]

export const catRules = {
  catName,
  catAge
}
