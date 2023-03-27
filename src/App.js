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

function App() {
  return (
    <div className="App">
     
      {/* <AnchorIcon fontSize='large'></AnchorIcon> */}
      {/* <container> 
        <div sx={{textAlign: 'right', marginRight: '0px', justifyContent: 'right'}}>
          <h2>FRIDGE NOTES</h2>
        </div>
      </container>  */}

    <Box sx={{ '& button': { m: 1 } }}>
      <div>
      <Button size="large">ABOUT</Button>
   
        <Button variant="outlined" size="large">
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

    <Box sx={{justifyContent:"center", margin: '0.3em'}}>
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
    </Box>  
 
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
          {a.map((itemm) => (
            <Grid key={itemm.index} item xs={12} md={6}>
              {/* <div key={itemm.index}> */}
                <Note text={itemm.noteText} title={itemm.noteTitle}/>
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
