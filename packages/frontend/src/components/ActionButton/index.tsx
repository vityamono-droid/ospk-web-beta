import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'

import ClearIcon from '@mui/icons-material/Cancel'
import ChevronDownIcon from '@mui/icons-material/ArrowDropDown'
import ChevronUpIcon from '@mui/icons-material/ArrowDropUp'

import { useRef, useState, type JSX } from 'react'
import Divider from '@mui/material/Divider'

interface Action {
  label: string | JSX.Element
  icon?: JSX.Element
  underline?: boolean
  value: string
}

interface ActionButtonProps {
  actions: Action[]
  count: number
  disabled?: boolean
  onClear?: () => void
  onSelect?: (value: string) => void
}

const ActionButton = ({ actions, count, disabled, onClear, onSelect }: ActionButtonProps) => {
  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const handleClear = () => {
    setOpen(false)
    !!onClear && onClear()
  }

  const handleChange = (value: string) => {
    setOpen(false)
    !!onSelect && onSelect(value)
  }

  return (
    <>
      {count != 0 && (
        <>
          <Button
            ref={ref}
            disabled={disabled}
            endIcon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={() => setOpen(true)}>
            Выбрано {count}
          </Button>
          <Popper
            open={open}
            anchorEl={ref.current}
            transition
            disablePortal
            role={undefined}
            sx={{ zIndex: 3, minWidth: 150 }}>
            {({ TransitionProps, placement }) => (
              <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                <Paper variant={'outlined'}>
                  <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <MenuList>
                      {!!onClear && (
                        <>
                          <MenuItem onClick={handleClear}>
                            <ListItemIcon>
                              <ClearIcon />
                            </ListItemIcon>
                            <ListItemText>Очистить</ListItemText>
                          </MenuItem>
                          <Divider />
                        </>
                      )}
                      {actions.map(({ label, icon, underline, value }) => (
                        <>
                          <MenuItem key={value} onClick={() => handleChange(value)}>
                            <ListItemIcon>{!!icon && icon}</ListItemIcon>
                            {typeof label === 'string' ? <ListItemText>{label}</ListItemText> : <>{label}</>}
                          </MenuItem>
                          {underline && <Divider />}
                        </>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      )}
    </>
  )
}

export default ActionButton
