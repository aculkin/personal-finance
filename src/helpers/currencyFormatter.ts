const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const currencyFormatter = (value: number) => formatter.format(value)

export { currencyFormatter }
