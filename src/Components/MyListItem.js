import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Grid, Paper} from '@mui/material'
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RemoveDialog from "./RemoveDialog";


import {setShow} from "../features/link/showSlice";
import {useDispatch, useSelector} from "react-redux";
import {setAllPosts, setAPost} from "../features/link/postsSlice";
import {useRef} from "react";

let postAndIndex = function (post, index) {
    this.post = post;
    this.index = index;
}

const MyListItem = (props) => {
    const likeButton = useRef(null);
    const dislikeButton = useRef(null);
    const dispatch = useDispatch();
    const show = useSelector((state) => state.show.value);
    const posts = useSelector((state) => state.posts.value);
    let index = props.index;

    const [open, setOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };
    const handleDialogClose = () => {
        setOpen(false);
    };
    const handleDeleteDialog = () => {
        deleteHandler();
        setOpen(false);
    };

    const handleFocusEnter = () => {
        dispatch(setShow());
    };
    const handleFocusLeave = () => {
        dispatch(setShow());
    };

    //handle likes (mocking database so no real changes on server)
    const likeHandler = async () => {
        let post = posts[index];
        const id = post.id;
        const points = post.points;
        const title = post.title
        const liked = post.liked;
        const disliked = post.disliked;
        const postURL = post.postURL;
        let toSend;
        likeButton.current.style.background = "lightBlue";
                const article = {
                    id: id,
                    title: title,
                    points: points + 1,
                    postURL: postURL,
                    liked: true,
                    disliked: false
                };
                toSend = new postAndIndex(article, index);
                dispatch(setAPost(toSend));
    };

    //handle dislikes (mocking database so no real changes on server)
    const dislikeHandler = async () => {
        let post = posts[index];
        const id = post.id;
        const points = post.points;
        const title = post.title
        const liked = post.liked;
        const disliked = post.disliked;
        const postURL = post.postURL;
        let toSend;
        if (post.points > 0) {
            dislikeButton.current.style.background = "lightBlue";
            const article = {
                id: id,
                title: title,
                points: points - 1,
                postURL: postURL,
                liked: false,
                disliked: true
            };
            toSend = new postAndIndex(article, index);
            dispatch(setAPost(toSend));
        }
    };

    //handle delete operation (mocking database so no real changes on server)
    const deleteHandler = async () => {
        let value0 = posts[index];
        dispatch(setAllPosts(posts.filter(item => item !== value0))); //filter out selected link from array
    };

    let ListItem0;
    if (posts[index]) { //return this if posts exists
        let linkName = posts[index].title; //get the name of link
        let linkAdress = posts[index].postURL;
        let pointValue = posts[index].points;
        ListItem0 =
            <ListItem alignItems="flex-start" onMouseEnter={handleFocusEnter} onMouseLeave={handleFocusLeave}>
                <div>
                    <Fab color="warning" ref={likeButton} onClick={function () {
                        likeHandler();
                    }}
                         size="small"
                         style={{position: 'absolute', right: 0, bottom: 5, height: 20, width: 20, minHeight: 20}}>
                        <KeyboardArrowUpIcon color="error"/>
                    </Fab>
                    <Fab color="warning" ref={dislikeButton} onClick={function () {
                        dislikeHandler();
                    }}
                         size="small"
                         style={{position: 'absolute', right: 26, bottom: 5, height: 20, width: 20, minHeight: 20}}>
                        <KeyboardArrowDownIcon color="error"/>
                    </Fab>
                </div>
                <Paper variant="outlined" square style={{padding: "1px", marginRight: "10px"}}>
                    <Grid container textAlign="center" justifyContent="center"
                          style={{minHeight: 80, maxHeight: 80, minWidth: 80}}>
                        <Grid item>
                            <h1 style={{fontSize: "medium"}}><i style={{color: 'orangered'}}>{pointValue}</i></h1>
                            <h1 style={{fontSize: "medium"}}><i style={{color: 'orange'}}>Points</i></h1>
                        </Grid>
                    </Grid>
                </Paper>
                <ListItemText
                    primary={<i style={{color: 'orange'}}>{linkName}</i>}
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