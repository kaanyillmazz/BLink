import * as React from 'react';
import axios from "axios";

import List from '@mui/material/List';
import {Pagination} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import {Box, Grid, Paper} from '@mui/material'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useRef} from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveDialog from "./RemoveDialog";

const MyListItem = (props) => {
    let index = props.index;
    let posts = props.posts;
    let setPosts = props.setPosts;
    let client = props.client;
    let postsHolder = props.postsHolder;

    //get the link according to index
    const [open, setOpen] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const handleDialogOpen = () => { setOpen(true); };
    const handleDialogClose = () => { setOpen(false);};
    const handleDeleteDialog = () => {
        deleteHandler();
        setOpen(false); };


    const handleFocusEnter = () => {
        setShow(true)
    };
    const handleFocusLeave = () => {
        setShow(false);
    };

    //handle likes (mocking database so no real changes on server)
    const likeHandler = async () => {
        let post = posts[index];
        const id = post.id;
        const points = post.points;
        const title = post.title;
        const article = {id: id, title: title, points: points + 1};
        const response = await client.put(`/${id}`, article);
        postsHolder[index] = article;
        setPosts(postsHolder);
    };

    //handle dislikes (mocking database so no real changes on server)
    const dislikeHandler = async () => {
        const id = posts[index].id;
        const points = posts[index].points
        const title = posts[index].title
        const article = {id: id, title: title, points: points - 1};
        const response = await client.put(`/${id}`, article);
        postsHolder[index] = article;
        setPosts(postsHolder);

    };

    //handle delete operation (mocking database so no real changes on server)
    const deleteHandler = async () => {
        const id = posts[index].id;
        const response = await client.delete(`/${id}`);
        let value0 = posts[index];
        postsHolder = postsHolder.filter(item => item !== value0) //filter out selected link from array
        setPosts(postsHolder);
    };

    let ListItem0;
    if (posts[index]) { //return this if posts exists
        let linkName = posts[index].title; //get the name of link
        let linkAdress = "https://" + linkName + ".com"  //generate link (because there is no field available in database)
        let pointValue = posts[index].points;
        ListItem0 =
            <ListItem alignItems="flex-start" onMouseEnter={handleFocusEnter} onMouseLeave={handleFocusLeave}>
                <div>
                    <Fab onClick={function () {
                        likeHandler(); }}
                         size="small"
                         style={{position: 'absolute', right: 0, bottom: 5, height: 20, width: 20, minHeight: 20}}>
                        <KeyboardArrowUpIcon/>
                    </Fab>
                    <Fab onClick={function () {
                        dislikeHandler();
                    }}
                         size="small"
                         style={{position: 'absolute', right: 26, bottom: 5, height: 20, width: 20, minHeight: 20}}>
                        <KeyboardArrowDownIcon/>
                    </Fab>
                </div>
                <Paper variant="outlined" square style={{padding: "1px", marginRight: "10px"}}>
                    <Grid container textAlign="center" justifyContent="center"
                          style={{minHeight: 80, maxHeight: 80, minWidth: 80}}>
                        <Grid item>
                            <h1 style={{fontSize: "medium"}}>{pointValue}</h1>
                            <h1 style={{fontSize: "medium"}}>Points</h1>
                        </Grid>
                    </Grid>
                </Paper>
                <ListItemText
                    primary={linkName}
                    secondary={<React.Fragment>
                        {linkAdress}
                    </React.Fragment>}/>
                <RemoveDialog handleDialogOpen={handleDialogOpen}
                              handleDialogClose={handleDialogClose}
                              handleDeleteDialog={handleDeleteDialog}
                              show={show}
                              open={open}
                />
            </ListItem>
    }
    return ListItem0;
}
export default MyListItem;