import Checkbox from '@mui/material/Checkbox'
import { useEffect, useState } from 'react'

type HeadSelector = {
  variant: 'head'
  value: string[]
}

type BodySelector = {
  variant: 'body'
  value: string
}

type RowSelectorProps = (HeadSelector | BodySelector) & {
  selected: string[]
  onSelect: (value: string[]) => void
}

const RowSelector = ({ variant, value, selected, onSelect }: RowSelectorProps) => {
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)

  useEffect(() => {
    switch (variant) {
      case 'head': {
        const checked = value.filter((item) => selected.includes(item))
        const isChecked = value.length != 0 && checked.length == value.length
        setChecked(value.length != 0 && checked.length == value.length)

        setIndeterminate(!isChecked && checked.length != 0)
        break
      }
      case 'body': {
        setChecked(selected.includes(value))
        break
      }
    }
  }, [value, selected])

  const handleChange = () => {
    switch (variant) {
      case 'head': {
        if (value.every((item) => selected.includes(item))) {
          onSelect([...selected.filter((item) => !value.includes(item))])
        } else {
          onSelect([...selected, ...value.filter((item) => !selected.includes(item))])
        }
        break
      }
      case 'body': {
        if (selected.includes(value)) {
          onSelect(selected.filter((item) => item != value))
        } else {
          onSelect([...selected, value])
        }
        break
      }
    }
  }

  return (
    <Checkbox
      size={'small'}
      checked={checked}
      indeterminate={indeterminate}
      onChange={handleChange}
      onClick={(event) => event.stopPropagation()}
    />
  )
}

export default RowSelector
