import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

interface SaveCancelButtonProps {
  removed?: boolean
  showRemoved?: boolean
  onDelete?: Callback
  onCancel?: Callback
  onSave?: Callback
}

const SaveCancelButton = (props: SaveCancelButtonProps) => {
  const { removed, showRemoved, onDelete, onCancel, onSave } = props

  return (
    <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={showRemoved ? 'space-between' : 'flex-end'}>
      {showRemoved && (
        <Button color={removed ? 'warning' : 'error'} onClick={onDelete}>
          {removed ? 'Восстановить' : 'Удалить'}
        </Button>
      )}
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <Button onClick={onCancel}>Отмена</Button>
        <Button color={'success'} variant={'outlined'} onClick={onSave}>
          Сохранить
        </Button>
      </Stack>
    </Stack>
  )
}

export default SaveCancelButton
