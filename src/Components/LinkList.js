import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import SortSelection from "./SortSelection";
import AddLink from "./AddLink";
import Paginator from "./Paginator";
import MyListItem from "./MyListItem"

import {useDispatch, useSelector} from "react-redux";
import {setAllPosts, setAPost} from "../features/link/postsSlice";

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
        console.log(event.target);
        setPage(page1);
        index = (((3 * page) - 3));

    };
    return (<div>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <AddLink id={++id}/>
                <SortSelection sorting={sorting} setSorting={setSorting}  />
                <MyListItem index={index}/>
                <Divider variant="inset" component="li"/>
                <MyListItem index={index + 1}/>
                <Divider variant="inset" component="li"/>
                <MyListItem index={index + 2}/>
            </List>
            <Paginator page={page} paginateHandler={paginateHandler}/>
        </div>
    );
}
export default LinkList;