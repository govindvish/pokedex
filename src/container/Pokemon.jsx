import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { toCaptialize } from '../utils';

const useStyles = makeStyles({
  pokemonCard: {
    color: '#FBFBFF',
  },
  backBtn: {
    borderColor: '#FBFBFF',
    color: '#FBFBFF',
  },
});

export const Pokemon = (props) => {
  const classes = useStyles();
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((res) => {
        console.log(res);
        const { data } = res;
        setPokemon(data);
      })
      .catch((err) => {
        setPokemon(false);
      });
  }, [pokemonId]);

  const getPokemon = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Typography variant="h1">
          {`${id}. ${toCaptialize(name)}`}
          <img src={front_default} alt="pokemonImg" />
        </Typography>
        <img
          src={fullImageUrl}
          style={{ height: 300, width: 300 }}
          alt="pokemonImg"
        />
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          {'Species: '}
          <span>{species.name}</span>
        </Typography>
        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography variant="h6">Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name}>{name}</Typography>;
        })}
        <Button
          variant="outlined"
          className={classes.backBtn}
          onClick={() => props.history.push('/')}
        >
          Pokedex
        </Button>
      </>
    );
  };
  return (
    <div className={classes.pokemonCard}>
      {pokemon === undefined && <CircularProgress size={50} thickness={5} />}
      {pokemon !== undefined && pokemon && getPokemon()}
      {pokemon === false && (
        <>
          <Typography>Pokemon Not Found</Typography>
          <Button
            variant="outlined"
            className={classes.backBtn}
            onClick={() => props.history.push('/')}
          >
            Pokedex
          </Button>
        </>
      )}
    </div>
  );
};
