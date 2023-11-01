import * as React from 'react';
import './App.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Note from './Note';
import NoteEdit from './NoteEdit';
import NoteDeletionWarning from './NoteDeletionWarning';
import AboutBox from './AboutBox';
import FridgeTop from './FridgeTop';
import FridgeBottom from './FridgeBottom';

import logoF from './logoF.png';

import Modal from '@mui/material/Modal';

import {useState, useEffect} from 'react';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function App() {
  // for the display of the Modal wich holds the NoteEdit component 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true); console.log('create note clicked');} 
  const handleClose = () => setOpen(false);

  // About Modal Hooks
  const [openAbout, setOpenAbout] = React.useState(false);
  const handleOpenAbout = () => setOpenAbout(true); 
  const handleCloseAbout = () => setOpenAbout(false);

  // Note deletion warning Modal Hooks
  const [currentIdToDelete, setCurrentIdToDelete] = React.useState('');
  const [openWarning, setOpenWarning] = React.useState(false);
  //open warning box before deleting or not a note
  const handleOpenWarning = (id) => {
    setCurrentIdToDelete(id);
    // set curent id to id
    setOpenWarning(true); 
  }

  // close warning box before deleting or not a note
  const handleCloseWarning = () => {
    setOpenWarning(false);
    setCurrentIdToDelete('');
  }

  const [userNotes, setUserNotes] = useState([]);

  const [textToEdit, setTextToEdit] = useState('');
  const [titleToEdit, setTitleToEdit] = useState('');
  const [IDToEdit, setIDToEdit] = useState(-1);

  // gets in real time the user notes list from local storage and 
  // changes the state of the user notes list to be displayed on screen 
  useEffect(() => {
    const userNotes = JSON.parse(localStorage.getItem('userNotes'));
    if (userNotes) {
      console.log('user notes found');
      setUserNotes(userNotes);
    } 
    asyncCall(); 
  }, []);

  // the child component passes on saveAndExit the title and text of the new note through a props function with 2 param
  const saveUserNote = (noteTitlee, noteTextt) => {
    // TEST---see if user note edit is registered
    // if (noteTitlee && noteTextt) {
    //   console.log("title: " + noteTitlee + ", text: " + noteTextt);
    // }

    asyncCall();
    // do NOT save a empty note
    if (noteTitlee === '' && noteTextt==='') {
      console.log('Empty note!');
    } else { 
        // the call has been made from an already written note
        // user has edited text, message or both ???
        if ( (textToEdit != '' && titleToEdit != '' && IDToEdit != -1) || 
        (textToEdit != '' && titleToEdit === '' && IDToEdit != -1) || 
        (textToEdit === '' && titleToEdit != '' && IDToEdit != -1)) {
           // make a new array from the previous user notes 
           // and add the new user note in the place of the old one that is edited using the ID to indentify it
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
              // when the desired ID is found save the new edited note in place of the old one
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
           localStorage.setItem('userNotes', JSON.stringify(newNotes));
        } else { 
          // the call has been made from CREATE NEW NOTE button
          // save another note at the end of the notes array
          let newArr = [...userNotes];
          let messageObj = {
            index: userNotes.length,
            noteTitle: noteTitlee,
            noteText: noteTextt
          };
          newArr.push(messageObj);
          setUserNotes(newArr);
          // save the new user note list to local storage
          localStorage.setItem('userNotes', JSON.stringify(newArr));
        }
    }
    // reset values to edit after changes had been made
    resetUserNotesValues();
  };
 
  //  reset values to edit and close note edit window
  const resetUserNotesValues = () => {
    setTextToEdit('');
    setTitleToEdit('');
    setIDToEdit(-1);
    handleClose();
  };

  // make the arrow at the bottom of the page visible only when there is at least 1 user note
  function toggleArrowVisibility() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // chnage visibility of the arrow button if there are no user notes 
        const userNotes = JSON.parse(localStorage.getItem('userNotes'));
         if (userNotes.length > 0) {
          console.log('user notes found');
          // there 1 or more user notes
          if (document.getElementById('scrollArrow').classList.contains('hidescrollUpArrow')) {
            // display scroll arrow
            document.getElementById('scrollArrow').classList.remove('hidescrollUpArrow');
          }
        } else {
          // there are no user notes
          if (!document.getElementById('scrollArrow').classList.contains('hidescrollUpArrow')) {
            // hide scroll arrow
            document.getElementById('scrollArrow').classList.add('hidescrollUpArrow');
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
  // updates the notes array  and the local storage
  const deleteNote = (id) => {
    console.log('delete note called  ' + id);
    let newNotes = [];
    let tempIndex = 0;
    // go through the notes and add them to the new notes array, except the note with the desired ID
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
    // update the user notes in the new array and in the local storage 
    setUserNotes(newNotes);
    localStorage.setItem('userNotes', JSON.stringify(newNotes));
    asyncCall();
  }

  /**
   * 
   * @param {*} id the id of the note from wich this function was called
   */
  const editNote = (id) => {
    console.log('Edit note called  ' + id);
    // update the current id of the note that needs to be edited
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
    // find the note in the notes array using id
    // open edit note with the text and title sent through Note props

    // searches in the notes array for the note with the needed ID
    userNotes.forEach(note => {
      if (note.index === id) {
        // updates the the title and the note text to be edited
        setTextToEdit(note.noteText);
        setTitleToEdit(note.noteTitle);
        // console.log(titleToEdit + ' ........................ ' +  textToEdit);
      }
      // if title and text to edit has values, open the note edit window with these values
      if ( textToEdit != null && titleToEdit != null ) {
        handleOpen();
      }
    });
  };

  const closeAndCreateNewNote = () => {
    // close about box and open the create new note one
    handleCloseAbout();
    handleOpen();
  };

  const handleContinueDeletion = () => {
    deleteNote(currentIdToDelete);
    handleCloseWarning();
  };

  const handleAbortDeletion = () => {
    handleCloseWarning();
  }

  return (
    <div className='App'>
      {/* Note creation */}
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        // reinitializeValuesToEdit={reinitializeValuesToEdit}
      >
        <div className='scroll-component'>
          <Box sx={{justifyContent:'center', margin: '4em 0.3em'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
              {/* editText, editTitle - values passed to child component. saveAndExit, discardChanges - used to pass actions from child component */}
                <NoteEdit  saveAndExit={saveUserNote} discardChanges={resetUserNotesValues} editText={textToEdit} editTitle={titleToEdit}/>
              </Grid> 
            </Grid>
          </Box>
        </div>
      </Modal> 

     
      {/* The note deletion warning box */}
      <Modal
          open={openWarning}
          onClose={handleCloseWarning}
      >
        <div className='scroll-component'>
          <NoteDeletionWarning continueDeletion={handleContinueDeletion} abortDeletion={handleAbortDeletion} />
        </div>
      </Modal> 

      {/* The about box */}
      <Modal
          open={openAbout}
          onClose={handleCloseAbout}
      >
        <div className='scroll-component'>
          <AboutBox okButtonPress={handleCloseAbout} createNewNotePress={closeAndCreateNewNote} />
        </div>
      </Modal>


      <Box
        sx={{
          backgroundColor: '#d1ffff',
          borderRadius: '25px',
          borderBottom: '2px solid #2f8e8e',
          padding: '10px',
          margin: 0
          // backgroundColor: 'primary.dark',
        }}
      > 
      <Box display='flex' justifyContent='flex-start' sx={{alignItems: 'left'}}>
        <img className='logo' src={logoF}  alt='' /> 
        
      </Box> 
        <Box sx={{ '& button': { m: 1 }}}>
          <div>
            <Button variant='outlined' onClick={handleOpen}  size='large'>
              CREATE NEW NOTE
            </Button>
            <Button className='about' onClick={handleOpenAbout}  sx={{padding: '0.4em'}}variant='outlined' size='large'>
           ABOUT FRIDGE NOTES 
          </Button>
          </div>
        </Box>

        <FridgeTop/>
      </Box> 
     
     {/* FRIDGE BOTTOM PART */}
      <Box
        sx={{
          backgroundColor: '#d1ffff', // #bff3f3 old
          marginTop: 2,
          padding: 2,
          border: '2px solid #2f8e8e',
          borderRadius: '25px',
          // height: '95%',
          marginBottom: '1em',
          minHeight: '100vh',
        }}
      > 

        <FridgeBottom/>

        <Box sx={{justifyContent:'center', height: '90%'}}>
          <Grid container spacing={2} 
            sx={{ 
              borderBottom: '2em solid #d1ffff', //#bff3f3 
              backgroundColor: '#d1ffff', //#bff3f3
              marginBottom: '1em',
              borderRadius: '25px', 
              // height: '95%'
            }} 
          >
            {userNotes.map((itemm) => (
              <Grid key={itemm.index} item xs={12} md={6} xl={4}>
                <Note delete={handleOpenWarning} edit={editNote} id={itemm.index} text={itemm.noteText} title={itemm.noteTitle}/>
              </Grid>
            ))}
          </Grid>
        </Box> 
        <div className='hidescrollUpArrow' id='scrollArrow'>
          <ArrowUpwardIcon  onClick={() => {window.scroll(0, 0);}} style={{color:'#2f8e8e', fontSize: 100}}></ArrowUpwardIcon>
        </div>
      </Box>     
      <h2 className='bottomText'>Made with love!</h2>    
</div> 
  );
}

export default App;
