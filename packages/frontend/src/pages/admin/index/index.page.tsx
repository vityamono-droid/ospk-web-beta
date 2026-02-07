import { cloneElement } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import adminNav from '@apps/admin.nav'

import { useAdminContext } from '@apps/admin.context'

/** Главная страница панели администрирования */
const IndexPage = () => {
  const context = useAdminContext()

  return (
    <>
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant={'h5'} fontWeight={'bold'}> Добрый день, Иванова И. И.</Typography>
      </Box>
      <Grid container spacing={2}>
        {adminNav.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper elevation={2} sx={{ aspectRatio: { xs: 'unset', sm: 1, lg: 'unset' } }}>
              <Box
                sx={{ p: 2, gap: 1, height: '100%', display: 'flex', flexDirection: { xs: 'row', sm: 'column', lg: 'row' } }}>
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'gray',
                      width: 'fit-content',
                      aspectRatio: 1,
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {cloneElement(item.icon, { color: 'white', sx: { fontSize: 32 } })}
                  </Box>
                </Box>
                <Box>
                  <Typography variant={'h6'} textAlign={'center'}>
                    {item.title}
                  </Typography>
                  <Button fullWidth>Перейти</Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default IndexPage
