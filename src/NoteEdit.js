import './NoteEdit.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import strawberry from './circleWithShadow.png';


import {useState, useEffect} from 'react';
import {useRef} from 'react';

function NoteEdit(props) {


  // function zzz(event) {
  //   console.log(updated + " bbbbbbbbbbbbbb");
  // }
  
  // modal
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   handleClose()
  // };
  let textToEdit = props.editText;
  let titleToEdit = props.editTitle;
  console.log('Text to edit is >>>>>>>>>>>>>>>>>>>>' + textToEdit + '              ' + titleToEdit);
  let noteObj =   {
    id:   1,
    title: 'groceries',
    noteContent: 'apple juice'
  };

  const [notes, setNotes] = useState([]);

  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [updated, setUpdated] = useState(message);
 
  // gets and updates in real time the note text and message, in case that the user does not change one of them before save
  // this component is used for both editing a new note and an already existing one
  // for the already existing one, user may edit just the text or just the message
  // useeffect makes sure that both are saved in real time on local hooks 
  useEffect(() => {
    const elementTitle = document.getElementById('standard-textarea1');
    setTitle(elementTitle.value); //standard-textarea2
    const elementText = document.getElementById('standard-textarea2');
    setMessage(elementText.value);
   }, []);

  // here we update notes array and change it in local storage too
  const saveText = () => {
    // console.log(element.value);
    setUpdated(message);
    // console.log(updated + " bbbbbbbbbbbbbb");
    let newArr = [...notes];
    let messageObj = {
      index: notes.length,
      noteTitle: title,
      noteText: message
    };
    newArr.push(messageObj);
    setNotes(newArr);
    // console.log(updated + "   on save"); 

    // on save --- message keeps current new message
    // copy the old ones in an array
    // create a new obj -- note title, note content, key
    // push it
    console.log(notes);
    console.log('OOOOOOOOOOOOOOOOOOo' , newArr[0].noteTitle);
    
    // pass a function with 2 parameters to parent component
    props.saveAndExit(title, message);
    props.reinitializeValuesToEdit(); // parent component has values to edit for editing a note
  };

  const discardTextSaving = () => {
    // handleClose();
    props.discardChanges();
  };

// for message --- update the note test in real time as the user changes it 
  const handleNoteTextChange = event => {
    setMessage(event.target.value);
    // console.log('The note text is:', message);
  };

// for title --- update the note title in real time as the user changes it 
  const handleNoteTitleChange = event => {
    console.log('Change eventttttttttttttttt    ' + event.target.value);
    setTitle(event.target.value);
    // console.log(notes); 
    // console.log('The note title is:', title);
  };

  return (
    <div className="Note">
      <Card className='card' sx={{ backgroundColor:'red', width: '90%', height: '100%', maxWidth: 450, margin: "0.5em", boxShadow: 10 }}>
        {/* <CircleIcon style={{ display: "flex", alignItems: "center" ,color:"#194b85", margin: "0.5em auto 0.5em", fontSize: 40, justifyContent: 'center'}}></CircleIcon> */}
        
        <img className='strawberryy' src={strawberry}  alt="sss" /> 
        <CardContent sx={{padding: '0px'}}>
          <Box 
            sx={{display: "flex", alignItems: "center" }}
          >
          <TextField
              InputProps={{
                inputProps: {
                  style: { textAlign: "center", fontSize: 27 },
                }
              }}
                fullWidth
                sx={{
                  justifyContent: 'center',
                  width: "70%",
                  margin: "1.5em auto",
                  wordWrap: "break-word",
                  borderColor: "yellow",
                  textAlign: 'center'
                }}
                
                id="standard-textarea1"
                // label="Title"
                placeholder="Note title"
                defaultValue={titleToEdit}
                multiline
                variant="standard"
                onChange={handleNoteTitleChange}
            />  
            </Box>
          {/* <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '30ch', width: "90%",  wordWrap: "break-word" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="standard-basic" label="Note" variant="standard" multiline/>
          </Box> */}
          <Box 
            sx={{display: "flex", alignItems: "center" }}
          >

          <TextField
                fullWidth
                sx={{
                  width: "89%",
                  margin: "2em auto",
                  wordWrap: "break-word"
                  
                }}
                inputProps={{style: {fontSize: 20}}}
                id="standard-textarea2"
                // label="Note Content"
                placeholder="Your note here!"
                defaultValue={textToEdit}
                multiline
                variant="standard"
                onChange={handleNoteTextChange}
              />
                 </Box>
                 
              {/* works, just uncomment it */}
                {/* <h2>Message: {'message: ' + message + ', title:  ' + title}</h2>
                <h2>Updated: {updated}</h2> */}
            {/* works, just uncomment it END */}

          {/* notes array */}
          {/* <h3>Notes: {notes}</h3>  */}

        {/* {notes.map((index, noteTitle, noteText) => (
          <div key={index}>
              <h3> { noteTitle + '  ' + noteText}</h3>
          </div>
        ))} */}

        {notes.map((note) => (
          <div key={note.index}>
              <h3> { note.noteTitle + '  ' + note.noteText}</h3>
          </div>
        ))}
        
        </CardContent>
        <CardActions style={{textAlign: 'center', justifyContent: 'center', margin: '0.2em 0.7em 0.7em'}}>
          {/* <Button variant="text">Save</Button> */}
          <button type="submit" style={{backgroundColor: 'transparent',   border: 'none', cursor:'pointer', overflow: 'hidden' }}>
            <SaveIcon onClick={saveText} style={{fontSize: 40}}/>
          </button>
          <button type="submit" style={{backgroundColor: 'transparent',   border: 'none', cursor:'pointer', overflow: 'hidden' }}>
            <DeleteOutlineOutlinedIcon onClick={discardTextSaving} style={{fontSize:40, padding: '0.3em'}}/>
          </button>
            
            
        </CardActions>
    </Card>
   
    </div>
  );
}

export default NoteEdit;