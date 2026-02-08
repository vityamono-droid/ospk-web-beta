import RemovedIcon from '@mui/icons-material/HighlightOff'
import DisabledIcon from '@mui/icons-material/ErrorOutline'
import Tooltip from '@mui/material/Tooltip'

interface RemovedDisabledProps {
  disabled?: boolean
  removed?: boolean
  removedAt?: Date | null
}

const RemovedDisabled = ({ disabled, removedAt }: RemovedDisabledProps) => {
  let planned
  if (removedAt) {
    const currDate = new Date(removedAt)
    planned = currDate.setDate(currDate.getDate() + 30)
  }

  return (
    <>
      {!!removedAt ? (
        <Tooltip
          title={`Автоматическое удаление запланировано ${planned ? `на ${new Date(planned)?.toLocaleDateString()}` : 'через месяц'}`}>
          <RemovedIcon color={'error'} />
        </Tooltip>
      ) : (
        disabled && (
          <Tooltip title={'Скрыто от отображения для клиентского сайта'}>
            <DisabledIcon color={'warning'} />
          </Tooltip>
        )
      )}
    </>
  )
}

export default RemovedDisabled
