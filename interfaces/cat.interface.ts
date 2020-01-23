import { ColorInterface } from '~/interfaces/color.interface'
import { BreedInterface } from '~/interfaces/breed.interface'

export interface CatInterface {
  id?: number,
  name?: string,
  age?: number,
  // eslint-disable-next-line camelcase
  color_id?:number,
  // eslint-disable-next-line camelcase
  breed_id?:number,

  color: ColorInterface,
  breed: BreedInterface,
}
