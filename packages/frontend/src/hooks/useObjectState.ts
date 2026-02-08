import { useState, type Dispatch, type SetStateAction } from 'react'

type DispatchAction<TValue = any> = Dispatch<SetStateAction<TValue>>

type PropChangeAction<TValue = any> = (data: Partial<TValue>) => void

type ReturnType<TValue = any> = [TValue, DispatchAction, PropChangeAction]

function useObjectState<TValue = any>(value: TValue): ReturnType<TValue> {
  const [state, setState] = useState<TValue>(value)

  const handlePropChange = (data: Partial<TValue>) => {
    setState({
      ...state,
      ...data,
    })
  }

  return [state, setState, handlePropChange]
}

export default useObjectState
