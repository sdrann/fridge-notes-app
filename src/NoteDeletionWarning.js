import './NoteDeletionWarning.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

/**
 * Component used for displaying a warning when the user clicks the deletion button for a note
 * @param {*} props used for accessing parent component functions for deleting or not the note  
 */
function NoteDeletionWarning(props) {
  // acces parent component to proceed with note deletion or not
  const doDelete = () => {
    props.continueDeletion();
  }
  const doNotDelete = () => {
    props.abortDeletion();
  }
  return(
    <Box>
      <Grid container spacing={2}>
       <Grid  item xs={0} sm={1} md={1} lg={2} xl={3}> </Grid>
       <Grid  item xs={12} sm={10} md={10} lg={8} xl={6}>
          <Box className='warningBox' >
            <h1 className='questionText'>Are you sure you want to remove this note from your fridge?</h1>
            <Button className='yesButton' variant='outlined' onClick={doDelete}  size='large'>YES!</Button>
            <Button className='noButton' variant='outlined' onClick={doNotDelete}  size='large'>NO!</Button>
          </Box>
        </Grid> 
        <Grid  item xs={0} sm={1} md={1} lg={2} xl={3}>  </Grid>
      </Grid>
    </Box>
  );
}

export default NoteDeletionWarning;