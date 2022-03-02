import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Modal, Box } from '@mui/material';
import {useEffect, useState, useRef} from "react"
import Header from '../../Header/Header';
import Loading from '../Loading/Loading';
import './HomeId.scss'
import {Link} from 'react-router-dom'

function HomeId() {
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
  const windowData = window.localStorage.getItem('findId')
const [open, setOpen] = useState(false);
const [deleteOpen, setDeleteOpen] = useState(false);

  const [restaurant, setrestaurant] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    fetch("https://exam-bac.herokuapp.com/product")
    .then((res) => res.json())
    .then((data) => {
      setrestaurant(data)
      setLoading(false)
    })
  }, [restaurant])
  console.log(restaurant);
 const localValue = window.localStorage.getItem('select_value');
 const filterUser = restaurant.filter(elem => elem.product_restaurant_id == windowData)
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
          image={titles.product_poster}
          alt="games_url"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {titles.product_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {titles.product_price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={'/order/' + titles.product_id} style={{textDecoration: 'none'}}>
        <Button size="small" data-id={titles.product_id} onClick={(e) => {
           window.localStorage.setItem('findProductId', e.target.dataset.id)
        }}>MORE</Button>
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

export default HomeId;
