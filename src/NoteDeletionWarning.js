import './NoteDeletionWarning.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function NoteDeletionWarning(props) {
  const doDelete = () => {
    props.continueDeletion();
  }
  const doNotDelete = () => {
    props.abortDeletion();
  }
  return(
    <Box className='warningBox' >
      <h1 className='questionText'>Are you sure you want to delete this note?</h1>
      <Button className='yesButton' variant='outlined' onClick={doDelete}  size="large">YES!</Button>
      <Button className='noButton' variant='outlined' onClick={doNotDelete}  size="large">NO!</Button>
    </Box>
  );
}

export default NoteDeletionWarning;