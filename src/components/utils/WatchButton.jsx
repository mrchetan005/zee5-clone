/* eslint-disable react/prop-types */
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button } from "@mui/material";

const WatchButton = ({ size = 32, bgColor = 'white', color = 'black', ...events }) => {

  return (
    <Button {...events} variant='outlined' sx={{
      fontSize: '14px',
      textTransform: 'capitalize',
      transition: 'all 0.3s ease-in',
      padding: '5px 10px 5px 5px',
      height: '32px',
      '&:hover': {
        borderColor: bgColor,
        color: color,
        backgroundColor: bgColor
      }
    }} className='flex items-center' color='inherit'>
      <PlayArrowIcon sx={{ fontSize: 22 }} />
      <span className={`text-[${size}px]`}>Watch</span>
    </Button>


  )
}

export default WatchButton;

