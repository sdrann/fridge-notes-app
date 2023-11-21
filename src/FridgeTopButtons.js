import { Box } from "@mui/material"
import logoF from './images/logoF.png';
import Button from '@mui/material/Button';

/**
 * Component used to display the 3 buttons at the top of the page
 * @param {*} props used for calling functions from parent component to create, open about Box or go to notes
 */
function FridgeTopButtons(props) {
  // call the note creation function from the parent component
  const createNote = () => {
    props.create();
  }
  // call about box display function from the parent component
  const openAbout = () => {
    props.about();
  }  
  // scroll to where the user notes are displayed
  const scrollToNotes = () => {
    document.getElementById('notesArea').scrollIntoView();
  }
  return (
    <Box>
      <Box display='flex' justifyContent='flex-start' sx={{alignItems: 'left'}}>
        <img className='logo' src={logoF}  alt='' /> 
      </Box>
      <Box sx={{ '& button': { m: 1 }}}>
        <div>
          <Button className='about' onClick={openAbout}  sx={{padding: '0.4em'}}variant='outlined' size='large'>
           ABOUT FRIDGE NOTES 
          </Button>
          <Button variant='outlined' onClick={createNote}  size='large'>
              CREATE NEW NOTE
            </Button>
          <Button className='about' onClick={scrollToNotes}  sx={{padding: '0.4em'}}variant='outlined' size='large'>
           SEE YOUR NOTES
          </Button>
        </div>
      </Box> 
    </Box>
  );
}

export default FridgeTopButtons;