export function applyFilter(data, filter) {
  if (!filter) {
    return data
  }

  const desdeFormatted = filter.desde?.format('YYYY-MM-DD') ?? null
  const hastaFormatted = filter.hasta?.format('YYYY-MM-DD') ?? null
  const { value } = filter
  console.log('value filter', value)

  return data?.filter(item => {
    const fechaValida =
      (!desdeFormatted || item.fecha_creado.slice(0, 10) >= desdeFormatted) &&
      (!hastaFormatted || item.fecha_editado.slice(0, 10) <= hastaFormatted)

    const idValido = !value || item.id.toString().includes(value)

    // Función recursiva para buscar dentro de objetos anidados
    const searchValueInObject = (obj, query) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key]
          if (typeof value === 'object') {
            if (searchValueInObject(value, query)) {
              return true
            }
          } else if (typeof value === 'string' && value.toLowerCase().includes(query)) {
            return true
          }
        }
      }

      return false
    }

    const itemValuesValid = searchValueInObject(item, value ? value?.toLowerCase() : '')

    return fechaValida && (idValido || itemValuesValid)
  })
}
