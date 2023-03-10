import './Note.css';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CircleIcon from '@mui/icons-material/Circle';
import AnchorIcon from '@mui/icons-material/Anchor';

function Note(props) {
  return (
    <div className="Note">
      <Card  className='card' sx={{ backgroundColor:'red', width: '90%', height: '100%', maxWidth: 450, margin: "0.5em", boxShadow: 10 }}>
        <CircleIcon style={{color:"#194b85", marginTop: "0.5em", fontSize: 40}}></CircleIcon>
        <CardContent sx={{padding: '0px'}}>
          <Typography variant="h5" component="div">
            <h3>{props.text}</h3>
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
    </div>
  );
}

export default Note;