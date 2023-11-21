import './AboutBox.css';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

/**
 * Component used to display a sort description of this app and to give the user the option to create a new note
 * directly from here or to close this box
 * @param {*} props used for calling parent functions to close this box or create a new note
 */
function AboutBox(props) {
  // call parent functions to close this box or close and create a new note
  const closeAboutBox = () => {
    props.okButtonPress();
  }
  const createNewNote = () => {
    props.createNewNotePress();
  }
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid  item xs={0} sm={1} md={1} lg={2} xl={3}> </Grid>
        <Grid  item xs={12} sm={10} md={10} lg={8} xl={6}>
          <Box className='aboutBox' >
            <h1 className='aboutText2'>Do you need space for your notes?</h1>
            <h2 className='aboutText'>Keep your notes safe in your web browser memory with our generous fridge space!</h2>
            <h2 className='aboutText'>Click </h2> 
            <Button onClick={createNewNote} sx={{margin: '0.5em'}} variant='outlined'  size='large'>
                CREATE NEW NOTE
            </Button>
            <h2 className='aboutText'>  and write your note!</h2>
            <Button className='okButton' variant='outlined' onClick={closeAboutBox}  size='large'>BACK </Button>
          </Box>
        </Grid> 
        <Grid  item xs={0} sm={1} md={1} lg={2} xl={3}>  </Grid>
      </Grid>
    </Box>
  );
}

export default AboutBox;
