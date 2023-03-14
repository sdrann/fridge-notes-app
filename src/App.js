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

import CircleIcon from '@mui/icons-material/Circle';
import AnchorIcon from '@mui/icons-material/Anchor';

import Note from './Note';

import handle2 from './handle2.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#91e0ff' : '#cc9cff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));


const a = [
  {
    name: "Tim",
    age: 27
  },
  {
    name: "Bob",
    age: 32
  },
  {
    name: "Ann",
    age: 27
  },
  {
    name: "Zen",
    age: 27
  }
];

function App() {
  return (
    <div className="App">
     
      <AnchorIcon fontSize='large'></AnchorIcon>
      <container> 
      <div sx={{textAlign: 'right', marginRight: '0px', justifyContent: 'right'}}>
        <h2>ABOUT</h2>
      </div>
      </container>
      {/* <Note text="AAAAAAAA"/>   */}

      {/* <Box sx={{justifyContent:"center", margin: '0.3em'}}>
        <Grid container spacing={2}>
          <Grid item xs={2} md={2}>
            <img className='handle' src={handle2}  alt="sss" width='40%' height='100%' />
          </Grid>
          </Grid>
      </Box> */}

      <Box sx={{justifyContent:"center", margin: '0.3em'}}>
        <Grid container spacing={2}>
          <Grid item xs={1} md={1}>
            <img className='handle' src={handle2}  alt="sss" />
          </Grid>
          <Grid item xs={11} md={11}>
            <Box sx={{justifyContent:"center"}}>
              <Grid container spacing={2}>
                {a.map((itemm, index) => (
                  <Grid item xs={12} md={6}>
                    {/* <Item>  */}
                      <div key={index}>
                        <Note text={itemm.name}/>
                      </div>
                    {/* </Item> */}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      

    </div>

   
  );
}

export default App;
