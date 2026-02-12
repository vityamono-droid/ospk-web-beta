const shortFullname = (firstName: string, lastName: string, patronymic: string | null) => {
  const lastNameLetter = lastName[0]
  const patronymicLetter = patronymic ? patronymic[0] : undefined
  return `${firstName} ${lastNameLetter}. ${!!patronymicLetter ? `${patronymicLetter}.` : ''}`
}

export default shortFullname
