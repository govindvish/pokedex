import React from 'react';

export const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  return (
    <div>
      <h1>Pokemon #{pokemonId}</h1>
    </div>
  );
};
