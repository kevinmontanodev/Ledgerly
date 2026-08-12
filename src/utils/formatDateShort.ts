export function formatDateShort(date: string | Date) {
  const d = new Date(date)

  return {
    month: d.toLocaleString("en-US", {
      month: "short"
    }).toLowerCase(),

    day: d.getDate()
  }
}

export function formatStringToDateInputValue(date: string | undefined){
    if (!date) return ""
    const dateObj = new Date(date)
    let formatDate = ""
    const [year, month, day] = date.split('-')

    if (!month){
        const [year, month, day] = date.split('/')
        formatDate = `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`
    } else {
        formatDate = dateObj.toISOString().split("T")[0]
    }

    return formatDate
}

export function toLocalISOString(dateString: string) {
  const date = new Date(dateString)
  const offset = date.getTimezoneOffset()
  const localDate = new Date(date.getTime() - offset * 60000)
  return localDate.toISOString()
}