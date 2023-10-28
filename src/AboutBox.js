import './AboutBox.css';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function AboutBox(props) {
  const closeAboutBox = () => {
    props.okButtonPress();
  }

  const createNewNote = () => {
    props.createNewNotePress();
  }
  return (
    <Box className='aboutBox' >
          <h1 className='aboutText2'>Do you need space for your notes?</h1>
          <h2 className='aboutText'>Keep your notes safe in your web browser memory with our generous fridge space!</h2>
          <h2 className='aboutText'>Click </h2> 
          <Button onClick={createNewNote} sx={{margin: '0.5em'}} variant='outlined'  size="large">
              CREATE NEW NOTE
          </Button>
          <h2 className='aboutText'>  and write your note!</h2>
          <Button className='okButton' variant='outlined' onClick={closeAboutBox}  size="large">BACK </Button>
    </Box>
  );
}

export default AboutBox;
