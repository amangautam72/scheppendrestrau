import * as React from 'react';

import Restrau from './src/App'

import useCachedResources from './hooks/useCachedResources';


export default function App(props) {
  const isLoadingComplete = useCachedResources();

  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Restrau></Restrau>
    );
  }
}

