import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import mockData from '../mockData';
import { toCaptialize } from '../utils';

const useStyles = makeStyles({
  pokemonCard: {
    color: '#FBFBFF',
  },
});

export const Pokemon = (props) => {
  const classes = useStyles();
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(mockData[`${pokemonId}`]);

  const getPokemon = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <div className={classes.pokemonCard}>
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
      </div>
    );
  };
  return <>{getPokemon()}</>;
};
