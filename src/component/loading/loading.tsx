/** @format */

import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const Loading = () => (
  <Box
    width='100vw'
    height='100vh'
    display='flex'
    justifyContent='center'
    alignItems='center'>
    <CircularProgress />
  </Box>
);

export default Loading;
