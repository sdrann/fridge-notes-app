import './Note.css';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import circleWithShadow from './images/circleWithShadow.png';

function Note(props) {
  // by not using directly in onClick prevents calling the function from props on the spot 
  const deleteHere = () => {
    // console.log(props.id + " delete here");
    props.delete(props.id);
  }

  const editHere = () => {
    props.edit(props.id);
  }

  return (
    <div className="Note">
      <Card  className='card' sx={{ width: '90%', height: '100%', maxWidth: 450, margin: "0.5em", boxShadow: 10 }}>
        <img className='strawberry' src={circleWithShadow}  alt="sss" />
        <CardContent sx={{padding: '0px'}}>
          <Typography className='noteTitle'  component="div">
            <h3>{props.title}</h3>
          </Typography>
          <Typography className='noteText'  variant="body2">
            {props.text}
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent: 'center', padding: '1.5em'}}>
          <EditIcon onClick={editHere} style={{fontSize: 40}}/>
          <DeleteOutlineOutlinedIcon onClick={deleteHere} style={{fontSize:40, padding: '0.3em'}}/>
        </CardActions>
      </Card>
    </div>
  );
}

export default Note;