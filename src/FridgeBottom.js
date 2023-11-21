import './FridgeBottom.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import handle2 from './images/handleeF.png';
import anchor from './images/anchor.png';

/**
 * Component made for the images from the bottom part of the fridge (page)
 */
function FridgeBottom() {
  return (
    <Box sx={{justifyContent:'center', margin: '0.3em 0.3em 1em 0'}}>
      <Grid container spacing={2}>
        <Grid item xs={5} md={5} sx={{padding: 0}}>
          <img className='handlee' src={handle2}  alt='' />
        </Grid>
        <Grid item xs={2} md={2}></Grid>
        <Grid item xs={5} md={5}>
          <img className='anchor' src={anchor} alt='' />
        </Grid>
      </Grid>
  </Box>
  );
}

export default FridgeBottom;
