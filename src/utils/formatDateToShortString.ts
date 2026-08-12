export const formaterDateToShortString = (date: Date) => {
    const formatterDay = new Intl.DateTimeFormat('es', {day: '2-digit'})
    const formatterMonth = new Intl.DateTimeFormat('es', {month: 'short'})
    const formatterYear = new Intl.DateTimeFormat('es', {year: 'numeric'})

    const day = formatterDay.format(date)
    const month = formatterMonth.format(date).replace('.', '').toLowerCase()
    const year = formatterYear.format(date)

    const monthCapitalize = month.charAt(0).toUpperCase() + month.slice(1)

    return `${day} ${monthCapitalize} ${year}`
}