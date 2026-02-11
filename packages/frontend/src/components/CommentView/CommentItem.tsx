import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const CommentItem = () => {
  return (
    <>
      <Stack>
        {/* Header */}
        <Stack direction={'row'} spacing={1}>
          <Avatar sx={{ width: 36, height: 36 }} />
          <Typography variant={'h6'}>Test U. S.</Typography>
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Stack width={36}>
            <Stack sx={{ borderLeft: '1px solid' }} />
          </Stack>
          <Typography sx={{ whiteSpace: 'wrap' }}>
            asdfsaf asfj saojf ihasoihf oihas fiohasoif haoishf iahsfoi haihf ihasoifh iashfo iaiosfh oiashf oiah foiah ihaisfh
            oasfhoia hoihf ohafi hoiaf oiash oihfioh aoi fhaioh fiaofh aihf iohaio hfiah faoif ioah faoi hfaoihf iaoh fihai
            hfoisa fioah iaohf ihafoi aoifhioah i hfio hafi
          </Typography>
        </Stack>
        <Stack direction={'row'}>
          <Stack width={36} height={36} alignItems={'flex-end'} justifyContent={'flex-start'}>
            <Stack sx={{ width: '50%', height: '50%', borderLeft: '1px solid', borderBottom: '1px solid' }} />
          </Stack>
          <Button variant={'outlined'}>Еще</Button>
        </Stack>
      </Stack>

      <Grid container>
        <Grid size={1}>
          <Avatar sx={{ width: 36, height: 36 }} />
        </Grid>
        <Grid size={11}>
          <Typography variant={'h6'}>Test U. S.</Typography>
        </Grid>
        <Grid size={1}>
          <Box borderLeft={'1px solid'} borderColor={'divider'} />
        </Grid>
        <Grid size={11}>
          <Typography>
            asdfsaf asfj saojf ihasoihf oihas fiohasoif haoishf iahsfoi haihf ihasoifh iashfo iaiosfh oiashf oiah foiah ihaisfh
            oasfhoia hoihf ohafi hoiaf oiash oihfioh aoi fhaioh fiaofh aihf iohaio hfiah faoif ioah faoi hfaoihf iaoh fihai
            hfoisa fioah iaohf ihafoi aoifhioah i hfio hafi
          </Typography>
        </Grid>
        <Grid size={1}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ width: '50%', height: '50%', border: '1px 1px 1px 1px solid black' }} />
          </Box>
        </Grid>
        <Grid size={11}>
          <Button variant={'outlined'}>Load more...</Button>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex' }}>
          <Avatar sx={{ width: 36, height: 36 }} />
          <Typography variant={'h6'}>Test U. S.</Typography>
        </Box>
        {/* Content */}
        <Box display={'flex'}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box borderLeft={'1px solid'} borderColor={'divider'}></Box>
          </Box>
          <Box>
            <Typography>
              asdfsaf asfj saojf ihasoihf oihas fiohasoif haoishf iahsfoi haihf ihasoifh iashfo iaiosfh oiashf oiah foiah
              ihaisfh oasfhoia hoihf ohafi hoiaf oiash oihfioh aoi fhaioh fiaofh aihf iohaio hfiah faoif ioah faoi hfaoihf iaoh
              fihai hfoisa fioah iaohf ihafoi aoifhioah i hfio hafi
            </Typography>
          </Box>
        </Box>
        {/* LoadMore */}
        <Box sx={{ display: 'flex' }}>
          <Box width={36} borderLeft={'1px solid'} borderBottom={'1px solid'} borderColor={'divider'} borderRadius={12}></Box>
          <Button variant={'outlined'}>Load more...</Button>
        </Box>
      </Box>
    </>
  )
}

export default CommentItem
