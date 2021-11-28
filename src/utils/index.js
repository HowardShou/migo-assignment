const checkHasOwnProp = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

const toDateString = timestamp => {
  if (timestamp) {
    const time = new Date(timestamp)
    const dateString = time.toDateString()
    const [, Month, day, year] = dateString.split(' ')
    return `${Month} ${day}, ${year}`
  } else return '-'
}

export { checkHasOwnProp, toDateString }
