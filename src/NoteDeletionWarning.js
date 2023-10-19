import './NoteDeletionWarning.css';
import * as React from 'react';
import Modal from '@mui/material/Modal';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
// import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function NoteDeletionWarning(props) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const doDelete = () => {
    // console.log(props.id + " delete here");
    props.continueDeletion();
  }
  const doNotDelete = () => {
    // console.log(props.id + " delete here");
    props.abortDeletion();
  }
  return(
    <div>
    {/* <Button onClick={handleOpen}>Open modal</Button> */}
    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    > 
    <div className='Note'>
      <Card  className='warningCard' sx={{textAlign: 'center', justifyContent: 'center', margin: '0.2em 0.7em 0.7em', width: '90%', height: '100%', maxWidth: 450, margin: "0.5em", boxShadow: 10 }}>
        
          <Typography variant="body2">
           <h2>Are you sure you want to delete this note?</h2>
          </Typography>
          <div></div>
          <Button onClick={doDelete}  className='warningButton' variant='outlined' size="large">
              Yes!
            </Button>
            <Button onClick={doNotDelete} className='warningButton' variant='outlined' size="large">
              No!
            </Button>
    </Card>
    </div>
    </Modal>
  </div>
 

  );
  
  
}

export default NoteDeletionWarning;