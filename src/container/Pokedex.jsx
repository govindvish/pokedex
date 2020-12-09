import React from 'react';
import { AppBar, Card, CardContent, Grid, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
});

export const Pokedex = () => {
  const classes = useStyles();
  const getPokemonCard = () => (
    <Grid item xs={12} sm={4}>
      <Card>
        <CardContent>Pokemon Card</CardContent>
      </Card>
    </Grid>
  );
  return (
    <>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      <Grid container spacing={2} className={classes.pokedexContainer}>
        {getPokemonCard()}
        {getPokemonCard()}
        {getPokemonCard()}
        {getPokemonCard()}
        {getPokemonCard()}
      </Grid>
    </>
  );
};
