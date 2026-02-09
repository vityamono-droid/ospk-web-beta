import DataGrid from '@components/DataGrid'
import IconCount from '@components/IconCount'
import RemovedDisabled from '@components/RemovedDisabled'
import type { ServiceDetails } from '@ospk/web-models/services'
import { useNavigate } from 'react-router'
import CommentIcon from '@mui/icons-material/Try'
import Chip from '@mui/material/Chip'

interface ServiceTable {
  data: ServiceDetails[]
}

const ServiceTable = ({data}: ServiceTable) => {
  const navigate = useNavigate()

  return (
    <DataGrid
      head={[
        {
          value: 'removedDisabled',
        },
        {
          label: 'Название',
          value: 'label',
        },
        {
          value: 'forLegals',
        },
        {
          value: 'commentsCount',
        },
        {
          label: 'НДС',
          value: 'vat',
        },
        {
          label: 'Цена',
          value: 'price',
        },
      ]}
      body={data.map((item) => ({
        ...item,
        removedDisabled: <RemovedDisabled disabled={item.disabled} removedAt={item.removedAt} />,
        forLegals: <Chip size={'small'} label={item.forLegals ? 'Для юр. лиц' : 'Для физ. лиц'} sx={{ width: '100%' }} />,
        commentsCount: <IconCount icon={CommentIcon} count={item.comments} tooltip={'Кол-во комментариев'} />,
        vat: `${item.vat} %`,
        price: `${item.price} ₽ ${item.amountType == 'FINITE' && item.unit ? `за ${item.unit}` : ''}`,
      }))}
      onRowClick={(id) => navigate(`service/${id}`)}
    />
  )
}

export default ServiceTable
