import React from 'react'
import {useRef} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {Grid, IconButton, Paper} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {useDispatch, useSelector} from "react-redux";
import {setAllPosts, setAPost, unshiftPosts, sortPosts} from "../features/link/postsSlice";

import Image from "../image1.jpg";

function AddLink(props) { //component for sending new links
    const sorting = useSelector((state) => state.sorting.value);
    const nextField = useRef(null);
    let id = props.id;
    const show = useSelector((state) => state.show.value);
    const posts = useSelector((state) => state.posts.value);
    const dispatch = useDispatch();


    //const textField = useRef(null);

    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [myPoints, setMyPoints] = React.useState(1);
    const [myUrl, setMyUrl] = React.useState("");

    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };


    const handleAdd = () => { //handler for adding a link and then closing the dialog
        let title = name;
        let url = myUrl;
        let points = myPoints;
        id++;
        const article = {id: id, title: title, points: points, postURL: url, liked: false, disliked: false};
        dispatch(unshiftPosts(article));
        if(sorting === "MostPoints") {
            dispatch(sortPosts((function (a, b) { return b.points - a.points })))
        } if(sorting === "LeastPoints") {
            dispatch(sortPosts((function (a, b) { return a.points - b.points })))
        }
        setOpen(false);
        setMyUrl("");
        setName("");
    };
    const handleAddClose = () => { //handler for adding a link and then closing the dialog
       if(name === "" || myUrl === "") {
           alert("Name and Url Cannot be Empty!");
       } else
           handleAdd();
    };

    const handleChange = (event) => { //set the name of the link
        let text = event.target.value;
        setName(text);
    };
    const handlePointsChange = (event) => { //set the name of the link
        let text = event.target.value;
        setMyPoints(text);
    };
    const handleURLChange = (event) => { //set the url of the link (currently not working)
        let text = event.target.value;
        setMyUrl(text);
    };

    return (<div>
        <Dialog open={open} onClose={handleClose} >
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
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="points"
                    label="Link points"
                    type="number"
                    value={myPoints}
                    fullWidth
                    variant="standard"
                    onChange={handlePointsChange}
                />
                <TextField
                    onKeyDown={event => {
                        if(event.key === "Enter") {
                            handleAddClose();
                        }
                    }}
                    margin="dense"
                    id="url"
                    label="URL"
                    type="url"
                    fullWidth
                    variant="standard"
                    value={myUrl}
                    ref={nextField}
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
                <Paper variant="outlined" sx={{backgroundImage: `url(${Image})`}}>
                    <Grid container spacing={0} alignItems="center" display="Flex" JustifyContent="Center">
                        <Grid item xs={4}>
                            <IconButton size="large">
                                <AddIcon color="warning" fontSize="large" onClick={handleClickOpen}/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                            <h1><i style={{color: "lightsteelblue"}}> Submit A</i> <i style={{color: 'orange'}}> Link</i></h1>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </div>)
}
export default AddLink;