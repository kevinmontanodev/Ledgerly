const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

export const formatAmount = (amount:number) => {
    return `$${formatter.format(amount)}`
}