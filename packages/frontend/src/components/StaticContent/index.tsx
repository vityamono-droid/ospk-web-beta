import { useGetStaticPageQuery } from '@api/client/static.api'
import { useEffect, useState } from 'react'

const StaticContent = ({ file }: { file: string }) => {
  const [content, setContent] = useState('')
  const getResponse = useGetStaticPageQuery(file)

  useEffect(() => {
    console.log(getResponse)
    if (!getResponse.isSuccess) {
      setContent('')
      return
    }
    setContent(getResponse.data)
  }, [getResponse.status])

  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export default StaticContent
