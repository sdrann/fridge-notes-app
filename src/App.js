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

//get all notes from local storage and display them --- here don't update note array
const a = [
  { 
    index: 0,
    noteTitle: "Tim",
    noteText: 'aaaaaaaaaaaaaa'
  },
  {
    index: 1,
    noteTitle: "Bob",
    noteText: 'bbbbbbbbbbbbbbbbbbbbbb'
  },
  {
    index: 2,
    noteTitle: "Ann",
    noteText: 'cccccccccccccc'
  },
  { 
    index: 3,
    noteTitle: "Zen",
    noteText: 'ddddddddddddd'
  }
];

const notesArr = JSON.stringify(a);

function App() {
  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    const userNotes = JSON.parse(localStorage.getItem('userNotes'));
    if (userNotes) {
      console.log("user notes found");
      setUserNotes(userNotes);
    }
  }, []);

  // the child component passes on saveNote the title and text of the new note
  const saveUserNote = (noteTitlee, noteTextt) => {
    if (noteTitlee && noteTextt) {
      console.log("title: " + noteTitlee + ", text: " + noteTextt);
    }
    handleClose();

    let newArr = [...userNotes];
    let messageObj = {
      index: userNotes.length,
      noteTitle: noteTitlee,
      noteText: noteTextt
    };
    newArr.push(messageObj);
    setUserNotes(newArr);
    localStorage.setItem("userNotes", JSON.stringify(newArr));
  };

  const f = () => {
    console.log("from local st");
    let notesArray = JSON.parse(localStorage.getItem("userNotes"));
    notesArray.forEach(element => console.log(element));
    // localStorage.clear();
  }

  // creates new array from the userNotes which excludes the one that needs to be deleted (with the index === id)
  // updates the new array in hooks and local storage
  const deleteNote = (id) => {
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
  }

  return (
    <div className="App">
     
      {/* <AnchorIcon fontSize='large'></AnchorIcon> */}
      {/* <container> 
        <div sx={{textAlign: 'right', marginRight: '0px', justifyContent: 'right'}}>
          <h2>FRIDGE NOTES</h2>
        </div>
      </container>  */}

      {/* opens only on onClick={handleOpen} */}
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={{justifyContent:"center", margin: '4em 0.3em'}}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <NoteEdit saveAndExit={saveUserNote} text={"AAAAAAAAAAAA"}/>
            </Grid> 
          </Grid>
        </Box>
      </Modal> 

    <Box sx={{ '& button': { m: 1 } }}>
      <div>
      <Button onClick={f} size="large">ABOUT</Button>
   
        <Button onClick={handleOpen} variant="outlined" size="large">
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
   
      <Button variant="outlined" size="large">
      ............ FRIDGE NOTES ............
      </Button>
    </Box>

    {/* <Box sx={{justifyContent:"center", margin: '0.3em'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={3}>
            <img className='strawb' src={anchor}  alt="sss" />
          </Grid> 
          <Grid item xs={12} md={12} lg={6}>
            <NoteEdit text={"AAAAAAAAAAAA"}/>
          </Grid> 
          <Grid item xs={12} md={12} lg={3}>
            <img className='strawb' src={strawberry}  alt="sss" />
          </Grid> 
        </Grid>
    </Box>   */}
 
      {/* <Note text="AAAAAAAA"/>   */}

      {/* <Box sx={{justifyContent:"center"}}>
        <Grid container spacing={2}>
          <Grid item xs={5} md={5}>
          <img className='anchor' src={anchor} alt="sss" />
          <img className='strawb' src={strawberry}  alt="sss" />
          </Grid>
        </Grid>
      </Box>  */}

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
      <hr />
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

     {/* <Box sx={{justifyContent:"center", margin: '0.3em'}}>
        <Grid container spacing={2}>
          <Grid item xs={2} sm={2} md={2}>
            <img className='handlee' src={handle}  alt="sss" />
          </Grid>
          <Grid item xs={10} sm={10} md={10}>
            <Box sx={{justifyContent:"center"}}>
              <Grid container spacing={2}>
                {a.map((itemm, index) => (
                  <Grid item xs={12} md={6}>
                 
                      <div key={index}>
                        <Note text={itemm.name}/>
                      </div>
               
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>  */}
       <Box sx={{justifyContent:"center"}}>
        <Grid container spacing={2}>
          {userNotes.map((itemm) => (
            <Grid key={itemm.index} item xs={12} md={6}>
              {/* <div key={itemm.index}> */}
                <Note delete={deleteNote} id={itemm.index} text={itemm.noteText} title={itemm.noteTitle}/>
              {/* </div> */}
            </Grid>
          ))}
        </Grid>
      </Box> 

      {/* <Box sx={{justifyContent:"center", margin: '0.3em'}}>
        <Grid container spacing={2}>
        
          <Grid item xs={5} md={5}>
            <img className='strawb' src={strawberry}  alt="sss" />
          </Grid> 
        </Grid>
      </Box>       */}

      

    </div>

   
  );
}

export default App;
