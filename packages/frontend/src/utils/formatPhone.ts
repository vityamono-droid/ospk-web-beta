
const formatPhone = (phone: string) => {
  return `+7 ${phone.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '($1) $2-$3-$4')}`
}

export default formatPhone
