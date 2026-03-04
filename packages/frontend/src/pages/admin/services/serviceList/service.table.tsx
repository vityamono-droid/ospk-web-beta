import Chip from '@mui/material/Chip'
import DataGrid from '@components/DataGrid'
import IconCount from '@components/IconCount'
import RemovedDisabled from '@components/RemovedDisabled'

import CommentIcon from '@mui/icons-material/Try'

import { useNavigate } from 'react-router'

import type { ServiceDetails } from '@ospk/web-models/services'

const ServiceTable = ({ data }: { data: ServiceDetails[] }) => {
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
          label: 'НДС',
          value: 'vat',
        },
        {
          label: 'Цена',
          value: 'price',
        },
        {
          value: 'commentsCount',
        },
      ]}
      body={data.map((item) => ({
        ...item,
        removedDisabled: <RemovedDisabled disabled={item.disabled} removedAt={item.removedAt} />,
        forLegals: <Chip size={'small'} label={item.forLegals ? 'Для юр. лиц' : 'Для физ. лиц'} sx={{ width: '100%' }} />,
        commentsCount: <IconCount autoHide icon={CommentIcon} count={item.comments} tooltip={'Кол-во комментариев'} />,
        vat: `${item.vat} %`,
        price: `${item.price} ₽ ${item.amountType == 'FINITE' && item.unit ? `за ${item.unit}` : ''}`,
      }))}
      onRowClick={(id) => navigate(id)}
    />
  )
}

export default ServiceTable
