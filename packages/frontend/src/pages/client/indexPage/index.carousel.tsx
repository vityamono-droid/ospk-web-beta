import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { useEffect, useState } from 'react'

import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Circle from '@mui/icons-material/Circle'

const carouselImages = [
  `/static/carousel/carousel001.webp`,
  `/static/carousel/carousel002.webp`,
  `/static/carousel/carousel003.webp`,
  `/static/carousel/carousel004.webp`,
]

const IndexCarousel = () => {
  const [currIndex, setCurrIndex] = useState(0)

  const handleNavClick = (delta: number) => {
    const len = carouselImages.length
    let newIndex = currIndex + delta

    setCurrIndex(newIndex < 0 ? len - 1 : newIndex >= len ? 0 : newIndex)
  }

  useEffect(() => {
    const intervalId = setTimeout(() => handleNavClick(1), 3500)
    return () => {
      clearTimeout(intervalId)
    }
  }, [currIndex])

  return (
    <Box width={'100%'} height={'250px'} position={'relative'}>
      <Box
        sx={{
          backgroundImage: `url(${location.origin}${carouselImages[currIndex]})`,
          backgroundSize: 'auto auto',
          backgroundPositionX: '50%',
          backgroundRepeat: 'no-repeat',
        }}
        height={'100%'}
      />
      <Box
        top={0}
        width={'100%'}
        height={'100%'}
        position={'absolute'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Button
          sx={{ height: '50%', borderRadius: '0 6px 6px 0', bgcolor: '#AEAEAE99' }}
          variant={'contained'}
          onClick={() => handleNavClick(-1)}>
          <ChevronLeft fontSize={'large'} />
        </Button>
        <Button
          sx={{ height: '50%', borderRadius: '6px 0 0 6px', bgcolor: '#AEAEAE99' }}
          variant={'contained'}
          onClick={() => handleNavClick(1)}>
          <ChevronRight fontSize={'large'} />
        </Button>
      </Box>
      <Box position={'absolute'} width={'100%'} bottom={16} display={'flex'} justifyContent={'center'}>
        {carouselImages.map((_, index) => (
          <IconButton
            key={`cnb_${index}`}
            color={index == currIndex ? 'primary' : undefined}
            onClick={() => setCurrIndex(index)}>
            <Box position={'relative'}>
              <Circle sx={{ fill: '#AEAEAE99', position: 'absolute', fontSize: 16 }} />
              <Circle sx={{ position: 'absolute', top: 3, left: 3, fontSize: 10 }} />
            </Box>
          </IconButton>
        ))}
      </Box>
    </Box>
  )
}

export default IndexCarousel
