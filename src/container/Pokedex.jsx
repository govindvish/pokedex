import React, { useState } from 'react';
import {
  AppBar,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import mockData from '../mockData';
import { toCaptialize } from '../utils';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: '#01BAEF',
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
});

export const Pokedex = (props) => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState(mockData);

  const getPokemonCard = (pokemonId) => {
    const { id, name } = pokemonData[`${pokemonId}`];
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
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
        <Toolbar />
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map((id) => getPokemonCard(id))}
        </Grid>
      ) : (
        <CircularProgress size={50} thickness={5} />
      )}
    </>
  );
};
