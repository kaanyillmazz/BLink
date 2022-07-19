import React from 'react';
import {Grid} from '@mui/material'
import {Divider} from '@mui/material'
import {Box} from '@mui/material'
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import LinkList from "./Components/LinkList";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setAllPosts, setAPost} from "./features/link/postsSlice";

const client = axios.create({
    baseURL: "https://mockend.com/kaanyillmazz/BLink/posts"
});

function App() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state);
    //get the links from the server
    React.useEffect(() => {
        async function getPosts() {
            const response = await client.get("");
            dispatch(setAllPosts(response.data));
        }

        getPosts();
    }, []);



  return (
    <div className="App">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} ml={1}>
          <h1 style={{color: 'red'}}>RedLink</h1>
        </Grid>
      </Grid>
      <Box mt={1} mb={2}>
        <Divider/>
      </Box>
      <Box mt={1} mb={1}>
        <Grid container spacing={0} alignItems="center" textAlign="center">
          <Grid item xs={4}/>
          <Grid item xs={4}>
            <Divider variant="middle"/>
          </Grid>
          <Grid item xs={4}/>
        </Grid>
      </Box>
      <Grid container spacing={0} display="flex" justifyContent="center">
        <Grid item xs={0}>
          <LinkList/>
        </Grid>
      </Grid>

    </div>
  );
}

export default App;
