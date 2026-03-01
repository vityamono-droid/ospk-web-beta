import Modal from '@components/Modal'
import Stack from '@mui/material/Stack'

import { useState, type MouseEvent } from 'react'
import {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useListRolesQuery,
  useUpdateRoleMutation,
} from '@api/admin/clients/roles.api'
import useStatusEffect from '@hooks/useStatusEffect'

import type { RoleDetails } from '@ospk/web-models/clients'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CancelIcon from '@mui/icons-material/Close'
import AddButton from '@components/AddButton'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import TextBox from '@components/new/TextBox'
import useObjectState from '@hooks/useObjectState'
import useAnalyzeRequired from '@hooks/useAnalyzeRequired'
import Menu from '@mui/material/Menu'

interface RoleModal {
  open?: boolean
  onClose?: Callback
}

const RoleModal = ({ open, onClose }: RoleModal) => {
  const listResponse = useListRolesQuery({})

  const [error, analyze] = useAnalyzeRequired(['label', 'name'])
  const [roles, setRoles] = useState<RoleDetails[]>([])
  const [selected, setSelected, setSelectedProp] = useObjectState<RoleDetails | undefined>(undefined)
  const [deleteRef, setDeleteRef] = useState<null | HTMLElement>(null)
  const [deleteItem, setDeleteItem] = useState<string>()

  const [addRole, addResponse] = useAddRoleMutation()
  const [updateRole, updateResponse] = useUpdateRoleMutation()
  const [deleteRole, deleteResponse] = useDeleteRoleMutation()

  useStatusEffect(() => setRoles(listResponse.data ?? []), [listResponse])
  useStatusEffect(() => {
    setSelected(undefined)
    listResponse.refetch()
  }, [addResponse, updateResponse, deleteResponse])

  const handleAdd = () => {
    const newItem = {
      id: '',
      label: '',
      name: '',
    }

    setRoles([...roles, newItem])
    setSelected(newItem)
  }

  const handleCancel = () => {
    if (!selected?.id) {
      setRoles(roles.filter((item) => !!item.id))
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
    deleteItem && deleteRole(deleteItem)
    handleDeleteReject()
  }

  const handleSave = () => {
    if (!selected) {
      return
    }

    const data = {
      label: selected.label?.trim() || null,
      name: selected.name.trim(),
    }

    if (!analyze(data)) {
      return
    }

    if (!!selected.id) {
      updateRole({ id: selected.id, data })
    } else {
      addRole(data)
    }
  }

  return (
    <Modal title={'Роли'} open={open} onClose={onClose}>
      <Stack spacing={2} width={500} height={500}>
        <Stack direction={'row'}>
          <AddButton disabled={!!selected} onClick={handleAdd} />
        </Stack>
        <Stack height={'100%'}>
          {roles.map((item) => (
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
                      <TextBox
                        label={'Значение'}
                        error={error.name}
                        value={selected.name ?? ''}
                        onChange={(value) => setSelectedProp({ name: value || null })}
                      />
                    </>
                  ) : (
                    <>
                      <Typography>{item.label}</Typography>
                      <Divider orientation={'vertical'} sx={{ height: 16 }} />
                      <Typography>{item.name}</Typography>
                    </>
                  )}
                </Stack>
              </ListItemText>
              <Stack direction={'row'} spacing={1}>
                {selected?.id == item.id ? (
                  <>
                    <Button
                      disabled={
                        !selected.label || !selected.name || (selected.label == item.label && selected.name == item.name)
                      }
                      onClick={handleSave}>
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

export default RoleModal
