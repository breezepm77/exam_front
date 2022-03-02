import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './Home.scss';
import { Button, CardActionArea, CardActions, Modal, Box } from '@mui/material';
import {useEffect, useState, useRef} from "react"
import Header from '../../Header/Header';
import Loading from '../Loading/Loading';
import {Link} from 'react-router-dom'

function Home() {

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

const [uuid, setuuid] = useState(0)
const [open, setOpen] = useState(false);
const [deleteOpen, setDeleteOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false);

  const [restaurant, setrestaurant] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    fetch("https://exam-bac.herokuapp.com/restaurant")
    .then((res) => res.json())
    .then((data) => {
      setrestaurant(data)
      setLoading(false)
    })
  }, [restaurant])
  const windowData = window.localStorage.getItem('findId')
 const localValue = window.localStorage.getItem('select_value');
 const filterUser = localValue == 'all' ? restaurant : restaurant.filter(elem => elem.restaurant_author == localValue)
  return (
<>
<Header/>
    <div className="flex_div">
    {loading === false ? filterUser.map((titles)=>{
        return(
              <Card sx={{ width: 300 }} style={{marginBottom: '10px'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="220"
          image={titles.restaurant_poster}
          alt="games_url"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {titles.restaurant_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {titles.restaurant_author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={'/' + titles.restaurant_id} style={{textDecoration: 'none'}}>
        <Button size="small" data-id={titles.restaurant_id} onClick={(e) => {
          window.localStorage.setItem('findId', e.target.dataset.id)
          let findendUser = restaurant.find(elem => elem.restaurant_id == e.target.dataset.id)
          window.localStorage.setItem('findName', findendUser.restaurant_name)
        }}>
          MORE
        </Button>
          </Link>
      </CardActions>
    </Card>
        )
      }) 
   : <Loading/>}
    </div>
</>
  );
}

export default Home;