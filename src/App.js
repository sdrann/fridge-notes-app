import logo from './logo.svg';
import './App.css';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import CircleIcon from '@mui/icons-material/Circle';
import AnchorIcon from '@mui/icons-material/Anchor';

import Note from './Note';
import NoteEdit from './NoteEdit';
import NoteDeletionWarning from './NoteDeletionWarning';

import handle2 from './handle5.png';
import handle from './handle444.png';
import boat from './boat2.png';
import strawberry from './strawberry.png';
import anchor from './anchor.png';
import muffin from './muffin.png';
import { margin } from '@mui/system';

import Modal from '@mui/material/Modal';
import * as React from 'react';
import ModalUnstyled from '@mui/base/ModalUnstyled';

import {useState, useEffect} from 'react';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#91e0ff' : '#cc9cff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  // for the display of the Modal wich holds the NoteEdit component 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userNotes, setUserNotes] = useState([]);

  const [textToEdit, setTextToEdit] = useState('');
  const [titleToEdit, setTitleToEdit] = useState('');
  const [IDToEdit, setIDToEdit] = useState(-1);

  // gets in real time the user notes list from local storage and 
  // changes the state of the user notes list to be displayed on screen 
  useEffect(() => {
    const userNotes = JSON.parse(localStorage.getItem('userNotes'));
    if (userNotes) {
      console.log("user notes found");
      setUserNotes(userNotes);
    } 
    asyncCall();
    
  }, []);
  const [isShown, setIsShown] = useState(false);
  const handlepopup = () => {
    setIsShown(true);;
  }

  // the child component passes on saveAndExit the title and text of the new note through a props function with 2 param
  const saveUserNote = (noteTitlee, noteTextt) => {
    // TEST---see if user note edit is registered
    // if (noteTitlee && noteTextt) {
    //   console.log("title: " + noteTitlee + ", text: " + noteTextt);
    // }

    asyncCall();
    // do NOT save a blanc note
    if (noteTitlee === '' && noteTextt==='') {
      console.log("Empty note!");
    } else { // the call has been made from an already written note
        // make a new array from the previous user notes and add the new user note to the end of it
        // user has edited text, message or both ???
        if ( (textToEdit != '' && titleToEdit != '' && IDToEdit != -1) || 
        (textToEdit != '' && titleToEdit === '' && IDToEdit != -1) || 
        (textToEdit === '' && titleToEdit != '' && IDToEdit != -1)) {
           // save note in place

           // make new empty array
           let newNotes = [];
           let tempIndex = 0;
           // search note by id
           userNotes.forEach(note => {
            if (note.index != IDToEdit) {
              // save the notes in array in the order they were before
              let tempNote = {
                index: tempIndex,
                noteTitle: note.noteTitle,
                noteText: note.noteText
              };
              tempIndex++;
              newNotes.push(tempNote);
            } else {
              // when I find the desired ID for my note
              // save the new edited note in place of the old one
              let tempNote = {
                index: tempIndex,
                noteTitle: noteTitlee,
                noteText: noteTextt
              };
              tempIndex++;
              newNotes.push(tempNote);
            }
          });

           // save it as user notes and update local storage
           setUserNotes(newNotes);
           localStorage.setItem("userNotes", JSON.stringify(newNotes));
        } else { // the call has not been made from an written note, but from CREATE NEW NOTE button
          // save another note
          let newArr = [...userNotes];
          let messageObj = {
            index: userNotes.length,
            noteTitle: noteTitlee,
            noteText: noteTextt
          };
          newArr.push(messageObj);
          setUserNotes(newArr);
          // save the new user note list to local storage
          localStorage.setItem("userNotes", JSON.stringify(newArr));
        }
    }

 
    handleClose();
    setTextToEdit('');
    setTitleToEdit('');
    setIDToEdit(-1);
  };

  const discardUserNote = () => {
    setTextToEdit('');
    setTitleToEdit('');
    setIDToEdit(-1);
    handleClose();
  };

  // const reinitializeValuesToEdit = () => {
  //   setTextToEdit('');
  //   setTitleToEdit('');
  // }
  function toggleArrowVisibility() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // chnage visibility of the arrow button if there are no user notes 
        const userNotes = JSON.parse(localStorage.getItem('userNotes'));
         if (userNotes.length > 0) {
          // there 1 or more user notes
          if (document.getElementById("scrollArrow").classList.contains("hidescrollUpArrow")) {
            // display scroll arrow
            document.getElementById("scrollArrow").classList.remove("hidescrollUpArrow");
          }
        } else {
          // there are no user notes
          if (!document.getElementById("scrollArrow").classList.contains("hidescrollUpArrow")) {
            // hide scroll arrow
            document.getElementById("scrollArrow").classList.add("hidescrollUpArrow");
          }
         }
          resolve('resolved');
      }, 100);
    });
  }
  
  async function asyncCall() {
    console.log('calling scroll arrow toggle');
    const result = await toggleArrowVisibility();
    console.log(result);
  }
  // creates new array from the userNotes which excludes the one that needs to be deleted (with the index === id)
  // updates the new array in hooks and local storage
  const deleteNote = (id) => {
    // handlepopup();
    
    console.log("delete note called  " + id);
    // console.log(id);
    let newNotes = [];
    let tempIndex = 0;
    userNotes.forEach(note => {
      if (note.index != id) {
        let tempNote = {
          index: tempIndex,
          noteTitle: note.noteTitle,
          noteText: note.noteText
        };
        tempIndex++;
        newNotes.push(tempNote);
      }
    });
    newNotes.forEach(element => console.log(element));
    setUserNotes(newNotes);
    localStorage.setItem("userNotes", JSON.stringify(newNotes));
    asyncCall();
  }

  const editNote = (id) => {
    console.log("Edit note called  " + id);
    setIDToEdit(id);
    // open NoteEdit with the text and message and id of the current note 
    // the NoteEdit has in place the same text and message
    // on save, the updated note will be in the same place, with the cureent hooks for text and message

    //search in the user notes for the id and modify the text and message in that place
    // search in the notes for the text and message from the id and update txt,msg  ----handle open

    // update the local storage with the new note list
    // from local storage the userNotes variable will be updated in real time
    // the userNotes will then be mapped as React Note components
    console.log('Note edit PRESSEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
    // find the note in array using id
    // titleToEdit='22e2';
    // console.log(titleToEdit + "xxxxxxxxxxxxxxxxx");
    // open edit note with the text and title sent through Note props
    userNotes.forEach(note => {
      if (note.index === id) {
        setTextToEdit( note.noteText);
        setTitleToEdit(note.noteTitle);
        console.log(titleToEdit + ' ........................ ' +  textToEdit);
      }
      if ( textToEdit != null && titleToEdit != null ) {
        handleOpen();
      }
    });

  };

  return (
    <div className="App">
      {/* opens only on onClick={handleOpen} */}
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        // reinitializeValuesToEdit={reinitializeValuesToEdit}
      >
        <div className="scroll-component">
          <Box sx={{justifyContent:"center", margin: '4em 0.3em'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <NoteEdit  saveAndExit={saveUserNote} discardChanges={discardUserNote} text={"AAAAAAAAAAAA"} editText={textToEdit} editTitle={titleToEdit}/>
              </Grid> 
            </Grid>
          </Box>
        </div>
      </Modal> 
      
      <Box
        sx={{
          backgroundColor: '#bff3f3',
          borderRadius: '25px',
          borderBottom: '2px solid #2f8e8e',
          padding: '10px',
          margin: 0
          // backgroundColor: 'primary.dark',
        }}
      > 
      
        <Box sx={{ '& button': { m: 1 } }}>
          <div>
            {/* <Button sx={{color: '#2f8e8e', fontWeight: 'bold'}} onClick={f} size="large">ABOUT</Button> */}
        
            <Button variant='outlined' onClick={handleOpen}  size="large">
              CREATE NEW NOTE
            </Button>
    
          </div>
        </Box>

        <Box
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{margin: '2em'}}
        >
      
          <Button onClick={handlepopup}  sx={{padding: '0.4em'}}variant="outlined" size="large">
          ............ FRIDGE NOTES ............
          </Button>
        </Box>

        <Box sx={{justifyContent:"center", margin: '0.3em'}}>
          <Grid container spacing={2}>
            <Grid item xs={5} md={5}>
              <img className='handle' src={handle}  alt="sss" />
            </Grid>
            <Grid item xs={5} md={5}>
              <img className='boat' src={boat}  alt="sss" />
            </Grid>
            <Grid item xs={2} md={2}>
              <img className='muffin' src={muffin}  alt="sss" />
              {/* <img className='anchor' src={anchor} alt="sss" /> */}
            </Grid> 
          </Grid>
        </Box>
      </Box> 
      {/* <hr /> */}
    
    

     {/* FRIDGE BOTTOM PART */}
      <Box
        sx={{
          backgroundColor: '#bff3f3',
          marginTop: 2,
          padding: 2,
          border: '2px solid #2f8e8e',
          borderRadius: '25px',
          // height: '95%',
          marginBottom: '1em',
          minHeight: '100vh',
          // backgroundColor: 'primary.dark',
        }}
      > 

        <Box sx={{justifyContent:"center", margin: '0.3em'}}>
          <Grid container spacing={2}>
            <Grid item xs={5} md={5}>
              <img className='handlee' src={handle2}  alt="sss" />
            </Grid>
            <Grid item xs={7} md={7}>
              {/* <img className='strawb' src={strawberry}  alt="sss" /> */}
              <img className='anchor' src={anchor} alt="sss" />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{justifyContent:"center", height: '90%'}}>
          <Grid container spacing={2} 
            sx={{ 
              borderBottom: '2em solid #bff3f3', 
              backgroundColor: '#bff3f3',
              marginBottom: '1em',
              borderRadius: '25px', 
              // height: '95%'
            }} 
          >
            {userNotes.map((itemm) => (
              <Grid key={itemm.index} item xs={12} md={6}>
                {/* <div key={itemm.index}> */}
                  <Note delete={deleteNote} edit={editNote} id={itemm.index} text={itemm.noteText} title={itemm.noteTitle}/>
                {/* </div> */}
              </Grid>
            ))}
          </Grid>
        </Box> 
        <div className='hidescrollUpArrow' id='scrollArrow'>
        <ArrowUpwardIcon  onClick={() => {window.scroll(0, 0);}} style={{color:"#2f8e8e", fontSize: 100}}></ArrowUpwardIcon>
        </div>
        {isShown && (
        <div>
        <NoteDeletionWarning></NoteDeletionWarning>
        </div>
      )}
        
      </Box>         
</div> 
  );
}

export default App;
