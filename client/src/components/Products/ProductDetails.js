import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import iphoneImage from '../../testImages/iphone.jpeg'
import CarouselCard from '../ImgProductCardCarousel/CarouselCard';
import ProductDetailsDescription from './ProductDetailsDescription'
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, addProductCart } from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
    marginTop: '5%'
  },
  root2: {
    marginTop: '10%',
    marginBottom: '10%',
  },
  image: {
    backgroundImage: `url(${iphoneImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    objectFit: 'contain',
    paddingTop: '60%'
  },
  paper: {
    margin: theme.spacing(4, 4),
    alignItems: 'flex-start',
  },
  buttons: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default function ProductDetails() {
  const classes = useStyles();
  const { id } = useParams()
  // const [ producto, setProducto ] = useState()
  const dispatch = useDispatch()
  const product = useSelector( state => state.productDetail)
  const userId = useSelector(state => state.userDetails)


  useEffect(() => {
    dispatch(getProductDetail(id))
    // fetch(`http://localhost:3001/products/${id}`)
    //     .then(res => res.json())
    //     .then(data => {
    //       setProducto(data)
    //     })
  }, [])

  const addtoCart = (e) => {
    e.preventDefault()
    if(product){
      dispatch(addProductCart(userId.id, id, product.price))
    }
  }

  return (
    <Container maxWidth="md">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={6} md={7}>
          <div className={classes.paper}>
            <CarouselCard  image={ product && product.image}/>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="div">
              <Box fontWeight="fontWeightBold" fontSize={26} m={1}>
              { product && product.name}
              </Box>
            </Typography>
            <div>
              <Rating />
            </div>
          </div>
          <div className={classes.paper}>
            <Typography component="h4" variant="h4" color='primary'>
            { product && product.price}
            </Typography>
            <Typography variant='subtitle2' color='textSecondary'>
            { product && product.stock !== 0 ? `${product.stock} - Disponible` : 'No Dispoble'}
            </Typography>
          </div>
          <div className={classes.paper}>
            <Typography variant='body1' color='textPrimary'>
              Color:  Negro
          </Typography>
            <Typography variant='subtitle2' color='textSecondary'>
              <span>Cantidad</span>: (select) (...disponibles)
          </Typography>
          </div>
          <div className={classes.buttons}>
            <Button disable = {!product || product.stock === 0} variant="contained" color="primary" size="medium" style={{ padding: '5px 25px' }}>
              buy
            </Button>
            <Button 
            onClick={addtoCart}
            disable = {!product || product.stock === 0} variant="outlined" 
            color="primary" size='medium' style={{ marginLeft: 'auto', padding: '5px 25px' }}>
              add cart
            </Button>
          </div>
        </Grid>
      </Grid>
      <ProductDetailsDescription classes={classes} description={ product && product.description}/>
    </Container>
  );
}
