import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

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
  const [pokemonData, setPokemonData] = useState({});

  const downloadPokeDexData = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then((res) => {
        console.log(res);
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
