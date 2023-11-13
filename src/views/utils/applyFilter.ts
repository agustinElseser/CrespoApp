export function applyFilter(data, filter) {
  if (!filter) {
    return data
  }

  const desdeFormatted = filter.desde?.format('YYYY-MM-DD') ?? null
  const hastaFormatted = filter.hasta?.format('YYYY-MM-DD') ?? null
  const { value } = filter

  return data?.filter(item => {
    const fechaValida =
      (!desdeFormatted || item.fecha.slice(0, 10) >= desdeFormatted) &&
      (!hastaFormatted || item.fecha.slice(0, 10) <= hastaFormatted)

    const idValido = !value || item.id.toString().includes(value)

    //** Combina todas las propiedades del item y busca el valor
    const itemValues = Object.values(item).join(' ').toLowerCase()
    const valueLowerCase = value ? value.toLowerCase() : ''
    const valueValido = !value || itemValues.includes(valueLowerCase)

    return fechaValida && (idValido || valueValido)
  })
}
