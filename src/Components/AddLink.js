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
import {setAllPosts, setAPost, unshiftPosts} from "../features/link/postsSlice";

function AddLink(props) { //component for sending new links
    let id = props.id;
    const show = useSelector((state) => state.show.value);
    const posts = useSelector((state) => state.posts.value);
    const dispatch = useDispatch();


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
        dispatch(unshiftPosts(article));
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
export default AddLink;