import './FridgeTop.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import handle from './images/handleF.png'; // was handle444
import boat from './images/boat2.png';
import muffin from './images/muffin.png';

function FridgeTop() {
  return (
    <Box className='fridgeTop' >
    <Grid container spacing={2} >
      <Grid item xs={5} md={5} sx={{padding: 0}} >
        <img className='handle' src={handle}  alt=''/>
      </Grid>
      <Grid item xs={1} md={1}>
      </Grid>
      <Grid item xs={3} md={3}>
        <img className='boat' src={boat}  alt='' />
      </Grid>
      <Grid item xs={1} md={1}>
      </Grid>
      <Grid item xs={2} md={2}>
        <img className='muffin' src={muffin}  alt='' />
      </Grid>
    </Grid>
  </Box>
  );
}

export default FridgeTop;
