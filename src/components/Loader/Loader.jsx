import React from 'react';
import { LinearProgress } from '@material-ui/core';
import './styles.css';

const Loader = () => {
  return (
    <div className="loader">
      <LinearProgress color="secondary" />
    </div>
  );
};

export default Loader;
