import * as React from 'react';
import axios from "axios";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import SortSelection from "./SortSelection";
import AddLink from "./AddLink";
import Paginator from "./Paginator";
import MyListItem from "./MyListItem"

const client = axios.create({
    baseURL: "https://mockend.com/kaanyillmazz/BLink/posts"
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
                <AddLink postsHolder={postsHolder} id={++id} setPosts={setPosts}/>
                <SortSelection sorting={sorting} setSorting={setSorting} postsHolder={postsHolder} postHolderDefault={postHolderDefault} />
                <MyListItem index={index} posts={posts} postsHolder={postsHolder} client={client} setPosts={setPosts}/>
                <Divider variant="inset" component="li"/>
                <MyListItem index={index + 1} posts={posts} postsHolder={postsHolder} client={client} setPosts={setPosts}/>
                <Divider variant="inset" component="li"/>
                <MyListItem index={index + 2} posts={posts} postsHolder={postsHolder} client={client} setPosts={setPosts}/>
            </List>
            <Paginator page={page} paginateHandler={paginateHandler}/>
        </div>
    );
}
export default LinkList;