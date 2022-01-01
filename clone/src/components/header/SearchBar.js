import React from 'react'
import { ListItem, makeStyles, List } from '@material-ui/core'
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux'
import { getProducts as listProducts } from '../../redux/actions/productAction'
import { useEffect } from 'react';

const useStyle = makeStyles(theme => ({
    searchIcon: {
        color: 'blue',
        padding: 6,
        height: 20,
        boxSizing: 'unset'
    },
    search: {

        [theme.breakpoints.down('sm')]: {
            width: '20%'
        },
        [theme.breakpoints.between('sm', 'md')]: {
            marginBottom: 15,
            width: '35%'
        },
        [theme.breakpoints.between('md', 'lg')]: {
            marginTop: 15
        },
        [theme.breakpoints.between('lg', 'xl')]: {
            marginBottom: 15
        },

    },
    list : {
        position : 'absolute',
        color : 'black',
        background  : 'white',
        margin : '38px 0 0 0',
        fontSize : 14
    },
    link : {
        color : 'black',
        textDecoration : 'none'
    }
}))

const Search = styled('div')(({ theme }) => ({

    backgroundColor: '#fff',
    // marginRight: theme.spacing(2),
    marginLeft: 10,
    width: '210%',
    borderRadius: 2,
    display: 'flex',
    marginBottom: 8

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    // padding: theme.spacing(0, 2),
    paddingLeft: 20,
    paddingTop: 10,
    color: 'blue',
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // color: 'inherit',
    // color : 'black' ,
    width: '100%',
    fontSize: 'unset',
    paddingLeft: 0,

}));




export default function SearchBar() {
    const classes = useStyle()
    const [text, setText] = useState()
    const [open, setopen] = useState(true)

    const getText = (text) => {
        setText(text)
        setopen(false)
        console.log(text)
    }
    const getProducts = useSelector(state => state.getProducts);
    const { products } = getProducts;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div className={classes.search}>
            <Search>
                <SearchIconWrapper>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search for products,brands and more"
                    inputProps={{ 'aria-label': 'search' }}
                    style={{ fontSize: 16, height: '2.4375em' }}
                    onChange={(e) => getText(e.target.value)}
                />

                <SearchIcon className={classes.searchIcon} />
                {
                    text &&
                    <List className={classes.list} hidden={open}>
                        {
                            products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                <ListItem>
                                    <Link to={`/product/${product.id}`} className={classes.link} onClick={()=>setopen(true)}>
                                     {product.title.longTitle}
                                     </Link>
                                </ListItem>

                            ))
                        }
                    </List>
                }
            </Search>

        </div>
    )
}
