import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  InputBase,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { toCaptialize } from '../utils';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#00A676',
  },
  pokedexContainer: {
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  cardMedia: {
    height: 130,
    width: 130,
    margin: 'auto',
  },
  cardContent: {
    textAlign: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  spinner: {
    color: '#FBFBFF',
  },
}));

export const Pokedex = (props) => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState('');

  const downloadPokeDexData = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then((res) => {
        const { data } = res;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    downloadPokeDexData();
  }, []);

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid item xs={12} sm={4} key={pokemonId}>
        <Card onClick={() => props.history.push(`/${pokemonId}`)}>
          <CardMedia className={classes.cardMedia} image={sprite} />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toCaptialize(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Pokemon..."
              onChange={(e) => setFilter(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).length !== 0 ? (
            Object.keys(pokemonData).map(
              (id) =>
                pokemonData[id].name.includes(filter) && getPokemonCard(id)
            )
          ) : (
            <Grid container justify="center" alignContent="center">
              <CircularProgress
                className={classes.spinner}
                size={50}
                thickness={5}
              />
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid container justify="center" alignContent="center">
          <CircularProgress
            className={classes.spinner}
            size={50}
            thickness={5}
          />
        </Grid>
      )}
    </>
  );
};
