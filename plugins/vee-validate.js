import { extend } from 'vee-validate'
import { required, alpha, between } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Campo requerido'
})

extend('alpha', {
  ...alpha,
  message: 'Solo letras permitidas'
})

extend('name_between', {
  ...between,
  message: 'Entre 5 y 200 caracteres humano'
})

extend('age_between', {
  ...between,
  message: 'Entre 0 y 20 años humano'
})
