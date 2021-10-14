import * as Yup from 'yup'
import CONSTANTS from '../constants'

export const newProductSchema = Yup.object({
  image: Yup.mixed()
    .test(
      'FILE_FORMAT',
      'Загруженный файл имеет неподдерживаемый формат',
      value =>
        !value || (value && CONSTANTS.SUPPORTED_FORMATS.includes(value.type))
    )
    .required('Требуется фотография'),
  products: Yup.array(),
  name: Yup.string()
    .test('already-exists', 'Такой продукт уже существует', function (value) {
      return !this.parent.products.find(item => item === value)
    })
    .min(1, 'Минимальное имя')
    .required('Введите имя'),
  price: Yup.number()
    .min(1, 'Минимальная цена 1')
    .max(
      Number.MAX_SAFE_INTEGER,
      `Максимальная цена ${Number.MAX_SAFE_INTEGER}`
    )
    .required('Введите минимальную цену'),
  weight: Yup.number()
    .min(1, 'Минимальный вес 1')
    .max(Number.MAX_SAFE_INTEGER, `Максимальный вес ${Number.MAX_SAFE_INTEGER}`)
    .required('Введите минимальный вес'),
  ingredients: Yup.array()
    .min(1, 'Как минимум один ингридиент')
    /* .test(
      'Minimal ingredients',
      'Как минимум один ингридиент',
      value => value.length > 0
    ) */
    .required('Выберите ингридиенты')
})
