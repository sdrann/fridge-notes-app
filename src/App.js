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
      {/* <header className="App-header"> */}
      {/* <Box sx={{ flexGrow: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item> 
        </Grid>
      </Grid>
    </Box> */}
    
   
    <AnchorIcon fontSize='large'></AnchorIcon>
    <container> 
    <div sx={{textAlign: 'right', marginRight: '0px', justifyContent: 'right'}}>
      <h2>ABOUT</h2>
    </div>
    </container>
    {/* <Note text="AAAAAAAA"/>   */}
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



   
    
    {/* <div sx={{ margin: "0em" }}>

    <Card sx={{ minWidth: 275, margin: "1em" }}>
      <CircleIcon style={{color:"red", marginTop: "0.5em"}}></CircleIcon>
      <CardContent>
        <Typography variant="h5" component="div">
          Groceries
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="text">Text</Button>
      </CardActions>
    </Card>

    <Card sx={{ minWidth: 275, margin: "1em" }}>
    <CircleIcon style={{color:"red", marginTop: "0.5em"}}></CircleIcon>
      <CardContent>
        <Typography variant="h5" component="div">
          Groceries
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="text">Text</Button>
      </CardActions>
    </Card>

    </div> */}

      {/* </header> */}
    </div>

   
  );
}

export default App;
