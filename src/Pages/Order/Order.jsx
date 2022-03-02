import Header from '../../Header/Header';
import './Order.scss';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Modal, Box } from '@mui/material';
import {useEffect, useState, useRef} from "react"
import Loading from '../Loading/Loading';
import {Link} from 'react-router-dom'


function Order() {
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
      const inputEmail = useRef()
      const [open, setOpen] = useState(false);
      const [deleteOpen, setDeleteOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleDeleteOpen = () => setDeleteOpen(true);
        const handleClose = () => setOpen(false);
        const handleDeleteClose = () => setDeleteOpen(false);
      
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
        function mailerFetch(e) {
            e.preventDefault()
            fetch("https://exam-bac.herokuapp.com/zakaz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: inputEmail.current.value
                })
            })
        }
        const windowData = window.localStorage.getItem('findProductId')
        const windowNameData = window.localStorage.getItem('findName')
       const localValue = window.localStorage.getItem('select_value');
       const filterUser = restaurant.filter(elem => elem.product_id == windowData)
    return (
        <>
        <Header/>
         <div className="flex_div">
        {loading === false ? filterUser.map((titles)=>{
            return(
                  <Card sx={{ width: 300 }} style={{marginTop: '440px'}}>
         <div className='absolute_div'>
             <div class="login">
  <div class="login-triangle"></div>
  
  <h2 class="login-header">ORDER</h2>

  <form class="login-container" onSubmit={(e) => mailerFetch(e)}>
    <p><input type="text" placeholder="Username"/></p>
    <p><input type="number" placeholder="Phone Number"/></p>
    <p><input type="email" ref={inputEmail} placeholder="Email"/></p>
    <p><input type="submit" value="ORDER"/></p>
  </form>
</div>
         </div>
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
              <Typography variant="body2" color="text.secondary">
                {windowNameData}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
          </CardActions>
        </Card>
            )
          }) 
       : <Loading/>}
        </div>
        </>
    )
}


export default Order;