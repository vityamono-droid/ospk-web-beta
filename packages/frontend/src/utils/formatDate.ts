
const formatDate = (date: Date | null) => {
  return date && `${date}`.slice(0, 10)
}

export default formatDate
