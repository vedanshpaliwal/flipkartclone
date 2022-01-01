import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { makeStyles, Typography, Box, Button, Divider } from '@material-ui/core';
import { timerURL } from '../../constants/data';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import Viewall from '../viewAll/Viewall';
const responsive = {

    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const useStyle = makeStyles(theme=>({
    image: {
        height: 120
    },
    component: {
        background: '#ffffff',
        marginTop: 12,
    },
    deal: {
        padding: '15px 20px',
        display: 'flex',
    },
    dealtext: {
        fontSize: '22px',
        fontWeight: 500,
        lineHeight: '32px',
        marginRight: 25
    },
    timer: {
        color: '#7f7f7f',
        marginLeft: '10px',
        alignItems: 'center',
        display: 'flex',
        marginTop  : 12,
        [theme.breakpoints.down('sm')]: {
            display  : 'none' 
        }
        
    },
    Button: {
        // marginLeft: 'auto',
        background: '#2874f0',
        borderRadius: '2px',
        fontSize: '11px',
        position : 'absolute',
        right : 250,
        top: '505px',
        [theme.breakpoints.down('xl')]  : {
            right : 371
        },
        [theme.breakpoints.only('xl')]  : {
            right : 491
        },
        [theme.breakpoints.down('sm')] : {
            position : 'absolute',
            right : 31,
            top :433
        },
        [theme.breakpoints.only('sm')] : {
            position : 'absolute',
            right : 31,
            top :432
        },
        [theme.breakpoints.between('md','sm')] : {
            position : 'absolute',
            right : 18,
        },
        [theme.breakpoints.between('md sm')] : {
            position : 'absolute',
            right : 250,
            top :405
        },
        [theme.breakpoints.only('lg')] : {
            position : 'absolute',
            right : 250,
            top :505
        },
        [theme.breakpoints.only('md')] : {
            position : 'absolute',
            right : 35,
            top :498
        }
           

        // left :  '850px'
    },
    text: {
        fontSize: 14,
        marginTop: 2,
        textDecoration: 'none'
    },
    wrapper: {
        padding: '35px 15px'
    },
    newbox :{
        display :'flex',
        [theme.breakpoints.down('sm')] : {
            display : 'flex',
            marginBottom : -18
        }
    },
    timerimg : {
         width: '15px' ,
         [theme.breakpoints.down('sm')] : {
             display : 'none'
         }
    },
    link  : {
        textDecoration  : 'none',
        // color : 'black'
    }

}));


export default function Slide({ timer, title, products }) {
    const classes = useStyle()

    const renderer = ({ hours, minutes, seconds }) => {
        return <span className={classes.timer}>{hours} : {minutes} : {seconds} Left</span>
    }
    return (
        <div>
            <Box className={classes.component}>
                <Box className={classes.deal}>
                    <Typography className={classes.dealtext}  >{title}</Typography>
                    {
                        timer &&
                        <Box> <Box  className={classes.newbox}> <img src={timerURL} className={classes.timerimg} />
                            <Countdown date={Date.now() + 4.04e+7} renderer={renderer} />
                            </Box>
                            <Link to={'viewALLProducts'}>
                            <Button variant='contained' color='primary'  className={classes.Button}>View All</Button></Link>
                        </Box>
                    }

                </Box>
                <Divider />
                <Carousel responsive={responsive} infinite={true} draggable={false} centerMode={true} swipeable={false} autoPlay={true} autoPlaySpeed={10000} keyBoardControl={true} showDots={false}
                    removeArrowOnDeviceType={"tablet", "mobile"}
                >
                    {
                        products.map(products => (
                            <Link to={`product/${products.id}`} className={classes.link}>
                                <Box className={classes.wrapper}>
                                    <img className={classes.image} src={products.url} />
                                    <Typography className={classes.text} style={{ fontWeight: 600, color: '#212121' }}>{products.title.shortTitle}</Typography>
                                    <Typography className={classes.text} style={{ color: 'green' }}>{products.discount}</Typography>
                                    <Typography className={classes.text} style={{ color: "#212121", opacity: 0.6 }}>{products.tagline}</Typography>
                                    <Typography></Typography>
                                </Box>
                            </Link>

                        ))

                    }


                    {/* <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div> */}
                </Carousel>
            </Box>
        </div>
    )
}
