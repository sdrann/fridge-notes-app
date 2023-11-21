import './NoteEdit.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveIcon from '@mui/icons-material/Save';
import circleWithShadow from './images/circleWithShadow.png';

import {useState, useEffect} from 'react';
/**
 * Component used for the editing of a note
 * @param {*} props used to pass values to edit from parent component to this component 
 * and to call functions from the parent component for saving or discarding changes made to the note
 */
function NoteEdit(props) {
  // note title and text to edit given from parent component through props
  let textToEdit = props.editText;
  let titleToEdit = props.editTitle;
  // console.log('Text to edit is: ' + textToEdit + '              ' + titleToEdit);

  // used to store in real time what the user types
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
 
  /**
   * Gets and updates in real time the note text and message, in case that the user does not change one of them before save
   * This component is used for both editing a new note and an already existing one.
   * For the already existing one, user may edit just the text or just the message.
   * useEffect() makes sure that both are saved in real time using hooks.
   */
  useEffect(() => {
    const elementTitle = document.getElementById('standard-textarea1');
    setTitle(elementTitle.value); //standard-textarea2
    const elementText = document.getElementById('standard-textarea2');
    setMessage(elementText.value);
   }, []);

 
  /**
   *  Using props we pass the values to be saved to a function from the parent component.
   *  The parent component will update the notes list in local storage
   */
  const saveText = () => {
    // the new note title and text will be sent to parent component
    props.saveAndExit(title, message);
  };

  // tell the parent component through props that the user hasn't made any changes to the note
  const discardTextSaving = () => {
    props.discardChanges();
  };

/**
 * 
 * @param {*} event the event from the TextField which triggered this function call
 */
  const handleNoteTextChange = event => {
    // update the note text in real time as the user changes it 
    setMessage(event.target.value);
    // console.log('The note text is:', message);
  };

/**
 * 
 * @param {*} event the event from the TextField which triggered this function call
 */
  const handleNoteTitleChange = event => {
    // update the note title in real time as the user changes it 
    setTitle(event.target.value);
    // console.log('The note title is:', title);
  };

  return (
    <div className='Note'>
      <Card className='card' sx={{ width: '90%', height: '100%', maxWidth: 450, margin: '0.5em', boxShadow: 10 }}>
        <img className='circleWithShadow' src={circleWithShadow}  alt='' /> 
        <CardContent sx={{padding: '0px'}}>
          <Box 
            sx={{display: 'flex', alignItems: 'center' }}>
            <TextField
              className='titleField'
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center', fontSize: 27 },
                }
              }}
              fullWidth
              id='standard-textarea1'
              placeholder='Note title'
              defaultValue={titleToEdit}
              multiline
              variant='standard'
              // used to save note title in real time only if the user changes it
              onChange={handleNoteTitleChange}
            />  
          </Box>

          <Box 
            sx={{display: 'flex', alignItems: 'center' }}>
            <TextField
              className='textField'
              fullWidth
              inputProps={{style: {fontSize: 20}}}
              id='standard-textarea2'
              placeholder='Your note here!'
              defaultValue={textToEdit}
              multiline
              variant='standard'
              // used to save note text in real time only if the user changes it
              onChange={handleNoteTextChange}
            />
          </Box>
        </CardContent>

        <CardActions style={{textAlign: 'center', justifyContent: 'center', margin: '0.2em 0.7em 0.7em'}}>
          <button type='submit' style={{backgroundColor: 'transparent',   border: 'none', cursor:'pointer', overflow: 'hidden' }}>
            <SaveIcon onClick={saveText} style={{fontSize: 40}}/>
          </button>
          <button type='submit' style={{backgroundColor: 'transparent',   border: 'none', cursor:'pointer', overflow: 'hidden' }}>
            <DeleteOutlineOutlinedIcon onClick={discardTextSaving} style={{fontSize:40, padding: '0.3em'}}/>
          </button>  
        </CardActions>
    </Card>
    </div>
  );
}

export default NoteEdit;