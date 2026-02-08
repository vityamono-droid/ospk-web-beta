type InputType = { id: string; label: string }[]

const toAcOptions = <TValue extends InputType>(value?: TValue) =>
  value?.map((item) => ({
    label: item.label,
    value: item.id,
  })) ?? []

export default toAcOptions
