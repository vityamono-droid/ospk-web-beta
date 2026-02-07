import Checkbox from '@components/new/Checkbox'
import DateBox from '@components/new/DateBox'
import PasswordBox from '@components/new/PasswordBox'
import RadioButton from '@components/new/RadioButton'
import TextBox from '@components/new/TextBox'
import Stack from '@mui/material/Stack'
import { useState } from 'react'

const PlaygroundPage = () => {
  const [checkbox, setCheckbox] = useState(false)
  const [radio, setRadio] = useState<string | undefined>()

  return (
    <Stack spacing={1.5}>
      <Stack direction={'row'} spacing={2}>
        <Stack>
          <RadioButton
            value={radio}
            onChange={(value) => setRadio(value)}
            items={[
              {
                label: 'shit',
                value: 'a',
              },
              {
                label: 'fuck',
                value: 'b',
              },
            ]}
          />
        </Stack>
        <Stack>
          <RadioButton
            label={'shit'}
            value={radio}
            onChange={(value) => setRadio(value)}
            items={[
              {
                label: 'shit',
                value: 'a',
              },
              {
                label: 'fuck',
                value: 'b',
              },
            ]}
          />
        </Stack>
        <Stack spacing={1}>
          <TextBox label={'TextBox'} />
          <PasswordBox label={'PasswordBox'} />
          <DateBox label={'DateBox'} />
        </Stack>
        <Stack spacing={1.25}>
          <Checkbox label={'shit'} checked={checkbox} onChange={(value) => setCheckbox(value)} />
          <Checkbox label={'shit'} disabled={checkbox} />
          <Checkbox label={'shit'} indeterminate={checkbox} />
        </Stack>
        <Stack>
          <RadioButton
            direction={'row'}
            label={'shit'}
            value={radio}
            onChange={(value) => setRadio(value)}
            items={[
              {
                label: 'shit',
                value: 'a',
              },
              {
                label: 'fuck',
                value: 'b',
              },
            ]}
          />
        </Stack>
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <Stack>

        </Stack>
        <Stack>

        </Stack>
        <Stack>

        </Stack>
      </Stack>
    </Stack>
  )
}

export default PlaygroundPage
