import React from 'react';
import {Grid} from '@mui/material'
import {Divider} from '@mui/material'
import {Box} from '@mui/material'
import './index.css';
import './App.css';
import LinkList from "./Components/LinkList";

function App() {
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <h1 style={{color: 'darkslateblue'}}>BLink</h1>
        </Grid>
      </Grid>
        <Divider/>
      <Box mt={1} mb={1}>
        <Grid container spacing={0} display="flex" justifyContent="center">
          <Grid item xs={4}>
            <Divider variant="middle"/>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={0} sx={{justifyContent: "center", display: "flex"}}>
        <Grid item>
          <LinkList/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
