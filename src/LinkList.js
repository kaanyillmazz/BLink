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

const client = axios.create({
    baseURL: "https://mockend.com/kaanyillmazz/redlink/posts"
});

//dummy placeholder links to show before posts are initialized from server
let obj = function (id, title, points) {
    this.id = id;
    this.title = title;
    this.points = points;
}
let obj1 = new obj(1, "Loading...", "0");
let obj2 = new obj(2, "Loading...", "0");
let obj3 = new obj(3, "Loading...", "0");

//this array holds links
let postsHolder = [obj1, obj2, obj3];
let postHolderDefault = [obj1, obj2, obj3];

function LinkList() {
    //sorting state
    const [sorting, setSorting] = React.useState("Default");

    function SortSelect() {
        //this is sorting component
        const handleChange = (event) => {
            let value = event.target.value.toString();
            let value0 = value.toString();
            if (sorting === "Default") {
                //save default sort (currently not working)
                postHolderDefault = JSON.parse(JSON.stringify(postsHolder)); }
            if (value0 === "MostPoints") {
                //sort from most points
                postsHolder.sort(function (a, b) { return b.points - a.points });
            } else if (value0 === "LeastPoints") {
                //sort from least points
                postsHolder.sort(function (a, b) { return a.points - b.points });
            } else if (value0 === "Default") {
                //get back the default sort
                postsHolder = JSON.parse(JSON.stringify(postHolderDefault)); }
            setSorting(value0);  //set the state to refresh frontend
        };

        return ( //return the component
            <Box mt={1} sx={{minWidth: 120}}>
                <FormControl fullWidth>
                    <InputLabel variant="standard"> Sort </InputLabel>
                    <NativeSelect value={sorting} onChange={handleChange}>
                        <option value="MostPoints">Most Points</option>
                        <option value="LeastPoints">Least Points</option>
                    </NativeSelect>
                </FormControl>
            </Box>
        );
    }


    const [posts, setPosts] = React.useState(postsHolder);


    //get the links from the server
    React.useEffect(() => {
        async function getPosts() {
            const response = await client.get("");
            postsHolder = response.data;
            setPosts(response.data);
        }

        getPosts();
    }, []);


    const MyListItem = ({index}) => {
        //get the link according to index
        const [open, setOpen] = React.useState(false);
        const [show, setShow] = React.useState(false);
        const AlertDialogNew = () => {

            const handleClick = () => { setOpen(true); };
            const handleClose = () => { setOpen(false);};
            const handleDelete = () => {
                deleteHandler();
                setOpen(false); };


            //disappearing delete box shows when you hover on a link
            let box;
            if (show) {
                box = <Box sx={{'& > :not(style)': {m: 1}}}>
                    <Fab size="small" color="secondary" aria-label="edit" style={{position: 'absolute'}}>
                        <DeleteOutlineIcon onClick={handleClick}/>
                    </Fab>
                </Box>
            }
            return (<div>
                {box}
                <Dialog //delete dialog shows up when open is true
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete this?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus> Yes </Button>
                    </DialogActions>
                </Dialog>
            </div>);
        }

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
                    <AlertDialogNew/>
                </ListItem>
        }
        return ListItem0;
    }


    let id = 100; //id required for creating new links
    function SubmitALinkComp() { //component for sending new links

        const textField = useRef(null);

        const [open, setOpen] = React.useState(false);
        const [name, setName] = React.useState("");
        const [url, setUrl] = React.useState("");

        const handleClickOpen = () => { setOpen(true); };
        const handleClose = () => { setOpen(false); };

        const handleAddClose = () => { //handler for adding a link and then closing the dialog
            let title = name;
            id++;
            let points = 0;
            const article = {id: id, title: title, points: points};
            console.log(article);
            postsHolder.unshift(article);
            setPosts(postsHolder);
            setOpen(false);
        };

        const handleChange = (event) => { //set the name of the link
            let text = event.target.value;
            setName(text);
        };
        const handleURLChange = (event) => { //set the url of the link (currently not working)
            let text = event.target.value;
            setUrl(text);
        };

        return (<div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a Link</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Website info:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Website Name"
                        type="text"
                        value={name}
                        fullWidth
                        variant="standard"
                        ref={textField}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="url"
                        label="URL"
                        type="url"
                        fullWidth
                        variant="standard"
                        value={url}
                        onChange={handleURLChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddClose}>Add</Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={1}>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Paper variant="outlined">
                        <Grid container spacing={0} alignItems="center" display="Flex" JustifyContent="Center">
                            <Grid item xs={4}>
                                <IconButton size="large">
                                    <AddIcon fontSize="large" onClick={handleClickOpen}/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                                <h1>Submit A <i style={{color: 'red'}}> Link</i></h1>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>)
    }

    //state for pagination
    const [page, setPage] = React.useState(1);
    let index = (((3 * page) - 3));

    const paginateHandler = (event) => { //handles when a page number is clicked
        let page1 = parseInt(event.target.innerText);
        setPage(page1);
        index = (((3 * page) - 3));

    };
    return (<div>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <SubmitALinkComp/>
                <SortSelect/>
                <MyListItem index={index}/>
                <Divider variant="inset" component="li"/>
                <MyListItem index={index + 1}/>
                <Divider variant="inset" component="li"/>
                <MyListItem index={index + 2}/>
            </List>
            <Stack spacing={2}>
                <Pagination count={33} variant="outlined" color="secondary" page={page} onChange={paginateHandler}/>
            </Stack>
        </div>
    );
}

export default LinkList;