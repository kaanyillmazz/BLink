import * as React from 'react';
import axios from "axios";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import SortSelection from "./SortSelection";
import AddLink from "./AddLink";
import Paginator from "./Paginator";
import MyListItem from "./MyListItem"

import {useDispatch, useSelector} from "react-redux";
import {setAllPosts, setAPost} from "../features/link/postsSlice";

const client = axios.create({
    baseURL: "https://mockend.com/kaanyillmazz/BLink/posts"
});
//dummy placeholder links to show before posts are initialized from server


//this array holds links


function LinkList() {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.posts.value);
    //sorting state
    const [sorting, setSorting] = React.useState("Default");



    let id = 100; //id required for creating new links

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
                <AddLink id={++id}/>
                <SortSelection sorting={sorting} setSorting={setSorting}  />
                <MyListItem index={index} posts={posts} client={client}/>
                <Divider variant="inset" component="li"/>
                <MyListItem index={index + 1} posts={posts} client={client}/>
                <Divider variant="inset" component="li"/>
                <MyListItem index={index + 2} posts={posts} client={client}/>
            </List>
            <Paginator page={page} paginateHandler={paginateHandler}/>
        </div>
    );
}
export default LinkList;