import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { toCaptialize } from '../utils';

const useStyles = makeStyles({
  root: {
    margin: '10px auto',
  },
  pokemonCard: {
    color: '#FBFBFF',
  },
  backBtn: {
    borderColor: '#00A676',
    color: '#00A676',
    '&:hover': {
      backgroundColor: '#00A676',
      borderColor: '#FBFBFF',
      color: '#FBFBFF',
    },
  },
  spinner: {
    color: '#FBFBFF',
  },
  cardRoot: {
    maxWidth: 500,
  },
  cardMedia: {
    margin: '0px auto',
    height: 300,
    width: 300,
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
        const { data } = res;
        setPokemon(data);
      })
      .catch((err) => {
        setPokemon(false);
      });
  }, [pokemonId]);

  const getPokemon = () => {
    const { name, id, species, height, weight, types } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    // const { front_default } = sprites;
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={4} sm={4}>
          <Card className={classes.cardRoot}>
            <CardHeader title={`${id}. ${toCaptialize(name)}`} />
            <CardActionArea>
              <CardMedia
                className={classes.cardMedia}
                image={fullImageUrl}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {'Species: '}
                  {toCaptialize(species.name)}
                </Typography>
                <Typography variant="body1" component="p">
                  Height: {height}
                </Typography>
                <Typography variant="body1" component="p">
                  Weight: {weight}
                </Typography>
                <Typography variant="body2" component="h2">
                  <Typography>Types:</Typography>
                  {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography key={name}>{name}</Typography>;
                  })}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                className={classes.backBtn}
                onClick={() => props.history.push('/')}
              >
                Pokedex
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  };
  return (
    <div className={classes.pokemonCard}>
      {pokemon === undefined && (
        <Grid container justify="center" alignContent="center">
          <CircularProgress
            className={classes.spinner}
            size={50}
            thickness={5}
          />
        </Grid>
      )}
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
