import AddButton from '@components/AddButton'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import Modal from '@components/Modal'
import Stack from '@mui/material/Stack'
import TextBox from '@components/new/TextBox'
import Typography from '@mui/material/Typography'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CancelIcon from '@mui/icons-material/Close'

import {
  useAddUnitMutation,
  useDeleteUnitMutation,
  useListUnitsQuery,
  useUpdateUnitMutation,
} from '@api/admin/services/units.api'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import useObjectState from '@hooks/useObjectState'
import useStatusEffect from '@hooks/useStatusEffect'
import { useState, type MouseEvent } from 'react'

import type { UpsertUnitDetails, UnitDetails } from '@ospk/web-models/services'

interface UnitsModalProps {
  open?: boolean
  onClose?: Callback
}

const UnitsModal = ({ open, onClose }: UnitsModalProps) => {
  const listResponse = useListUnitsQuery({})

  const [error, analyze] = useAnalyzeRequired<UpsertUnitDetails>(['label'])
  const [units, setUnits] = useState<UnitDetails[]>([])

  const [selected, setSelected, setSelectedProp] = useObjectState<UnitDetails | undefined>(undefined)
  const [deleteRef, setDeleteRef] = useState<null | HTMLElement>(null)
  const [deleteItem, setDeleteItem] = useState<string>()

  const [addUnit, addResponse] = useAddUnitMutation()
  const [updateUnit, updateResponse] = useUpdateUnitMutation()
  const [deleteUnit, deleteResponse] = useDeleteUnitMutation()

  useStatusEffect(() => setUnits(listResponse.data ?? []), [listResponse])
  useStatusEffect(() => {
    setSelected(undefined)
    listResponse.refetch()
  }, [addResponse, updateResponse, deleteResponse])

  const handleAdd = () => {
    const newItem = {
      id: '',
      label: '',
      removedAt: null,
    }

    setUnits([...units, newItem])
    setSelected(newItem)
  }

  const handleCancel = () => {
    if (!selected?.id) {
      setUnits(units.filter((item) => !!item.id))
    }

    setSelected(undefined)
  }

  const handleDelete = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    setDeleteItem(id)
    setDeleteRef(event.currentTarget)
  }

  const handleDeleteReject = () => {
    setDeleteRef(null)
    setDeleteItem(undefined)
  }

  const handleDeleteConfirm = () => {
    deleteItem && deleteUnit(deleteItem)
    handleDeleteReject()
  }

  const handleSave = () => {
    if (!selected) {
      return
    }

    const data = {
      ...selected,
      id: undefined,
      label: selected.label?.trim(),
    }

    if (!analyze(data)) {
      return
    }

    if (!!selected.id) {
      updateUnit({ id: selected.id, data })
    } else {
      addUnit(data)
    }
  }

  return (
    <Modal title={'Единицы измерения'} open={open} onClose={onClose}>
      <Stack spacing={2} justifyContent={'space-between'} minWidth={500} minHeight={500}>
        <Stack spacing={2}>
          <Stack direction={'row'}>
            <AddButton disabled={!!selected} onClick={handleAdd} />
          </Stack>
          <Stack height={'100%'}>
            {units.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText>
                  <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    {selected?.id == item.id ? (
                      <>
                        <TextBox
                          label={'Название'}
                          error={error.label}
                          value={selected.label ?? ''}
                          onChange={(value) => setSelectedProp({ label: value || null })}
                        />
                      </>
                    ) : (
                      <>
                        <Typography>{item.label}</Typography>
                      </>
                    )}
                  </Stack>
                </ListItemText>
                <Stack direction={'row'} spacing={1}>
                  {selected?.id == item.id ? (
                    <>
                      <Button disabled={!selected.label || selected.label == item.label} onClick={handleSave}>
                        Сохранить
                      </Button>
                      <IconButton onClick={handleCancel}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton disabled={!!selected} onClick={() => setSelected(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton disabled={!!selected} onClick={(event) => handleDelete(event, item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </Stack>
              </ListItem>
            ))}
          </Stack>
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button onClick={onClose}>Отмена</Button>
        </Stack>
      </Stack>
      <Menu
        open={!!deleteRef}
        anchorEl={deleteRef}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 64,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <Stack p={1} spacing={1}>
          <Typography>Вы точно хотите удалить эту роль?</Typography>
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <Button onClick={handleDeleteConfirm}>Да</Button>
            <Button onClick={handleDeleteReject}>Нет</Button>
          </Stack>
        </Stack>
      </Menu>
    </Modal>
  )
}

export default UnitsModal
