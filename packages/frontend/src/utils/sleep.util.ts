
const sleep = async <T = any>(ms: number, data: T) => {
  await new Promise(resolve => setTimeout(resolve, ms))

  return data
}

export default sleep
