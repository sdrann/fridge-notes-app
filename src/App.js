import * as React from 'react';
import './App.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';

import Note from './Note';
import NoteEdit from './NoteEdit';
import NoteDeletionWarning from './NoteDeletionWarning';
import AboutBox from './AboutBox';

import handle2 from './handleeF.png'; //'./handle5.png'
import handle from './handleF.png'; // was handle444
import boat from './boat2.png';
import anchor from './anchor.png';
import muffin from './muffin.png';
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
      console.log("user notes found");
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
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
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
    // console.log(userSelection);
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
    <div className="App">
      {/* opens only on onClick={handleOpen} */}
      {/* Note creation */}
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

      {/* The about box */}
      <Modal
          open={openWarning}
          onClose={handleCloseWarning}
      >
        <div className="scroll-component">
          <Box>
            <Grid container spacing={2}>
              <Grid  item xs={0} sm={1} md={1} lg={2} xl={3}> </Grid>
              <Grid  item xs={12} sm={10} md={10} lg={8} xl={6}>
                  <NoteDeletionWarning continueDeletion={handleContinueDeletion} abortDeletion={handleAbortDeletion} />
              </Grid> 
              <Grid  item xs={0} sm={1} md={1} lg={2} xl={3}>  </Grid>
            </Grid>
          </Box>
        </div>
      </Modal> 

      {/* The note deletion warning box */}
      <Modal
          open={openAbout}
          onClose={handleCloseAbout}
      >
        <div className="scroll-component">
          <Box>
            <Grid container spacing={2}>
              <Grid  item xs={0} sm={1} md={1} lg={2} xl={3}> </Grid>
              <Grid  item xs={12} sm={10} md={10} lg={8} xl={6}>
                  <AboutBox okButtonPress={handleCloseAbout} createNewNotePress={closeAndCreateNewNote} />
              </Grid> 
              <Grid  item xs={0} sm={1} md={1} lg={2} xl={3}>  </Grid>
            </Grid>
          </Box>
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
      <Box display="flex" justifyContent="flex-start" sx={{alignItems: 'left'}}>
        <img className='logo' src={logoF}  alt="sss" /> 
        
      </Box> 
        <Box sx={{ '& button': { m: 1 }}}>
          <div>
            {/* <Button sx={{color: '#2f8e8e', fontWeight: 'bold'}} onClick={f} size="large">ABOUT</Button> */}
            
            <Button variant='outlined' onClick={handleOpen}  size="large">
              CREATE NEW NOTE
            </Button>
            <Button className='about' onClick={handleOpenAbout}  sx={{padding: '0.4em'}}variant="outlined" size="large">
           ABOUT FRIDGE NOTES 
          </Button>
          </div>
        </Box>

        <Box className='fridgeTop' >
          <Grid container spacing={2} >
            <Grid item xs={5} md={5} sx={{padding: 0}} >
              <img className='handle' src={handle}  alt="sss"/>
            </Grid>
            <Grid item xs={1} md={1}>
            </Grid>
            <Grid item xs={3} md={3}>
              <img className='boat' src={boat}  alt="sss" />
            </Grid>
            <Grid item xs={1} md={1}>
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
          backgroundColor: '#d1ffff', // #bff3f3 old
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

        <Box sx={{justifyContent:"center", margin: '0.3em 0.3em 1em 0'}}>
          <Grid container spacing={2}>
            <Grid item xs={5} md={5} sx={{padding: 0}}>
              <img className='handlee' src={handle2}  alt="sss" />
            </Grid>
            <Grid item xs={2} md={2}>
              {/* <img className='strawb' src={strawberry}  alt="sss" /> */}
              {/* <img className='muffin' src={muffin}  alt="sss" /> */}
            </Grid>
            <Grid item xs={5} md={5}>
              {/* <img className='strawb' src={strawberry}  alt="sss" /> */}
              <img className='anchor' src={anchor} alt="sss" />
            </Grid>

          </Grid>
        </Box>

        <Box sx={{justifyContent:"center", height: '90%'}}>
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
                {/* <div key={itemm.index}> */}
                  <Note delete={handleOpenWarning} edit={editNote} id={itemm.index} text={itemm.noteText} title={itemm.noteTitle}/>
                {/* </div> */}
              </Grid>
            ))}
          </Grid>
        </Box> 
        <div className='hidescrollUpArrow' id='scrollArrow'>
        <ArrowUpwardIcon  onClick={() => {window.scroll(0, 0);}} style={{color:"#2f8e8e", fontSize: 100}}></ArrowUpwardIcon>
        </div>
      </Box>         
</div> 
  );
}

export default App;
