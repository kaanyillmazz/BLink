import React from 'react'
import Stack from "@mui/material/Stack";
import {Pagination} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {setIndex, setPage} from "../features/link/sortingSlice";


function Paginator(props) {

    const page = useSelector((state) => state.sorting.page);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.value);
    let postCount = posts.length;
    let pageCount = Math.ceil(postCount/3);

    dispatch(setIndex(((3 * page) - 3)));
    console.log(page);


    const paginateHandler = (event) => { //handles when a page number is clicked
        let page1 = parseInt(event.target.innerText);
        console.log(event.target);
        dispatch(setPage(page1));
        dispatch(setIndex(((3 * page) - 3))) ;
    };

    return (
    <Stack spacing={2}>
        <Pagination hideNextButton={true} hidePrevButton={true} count={pageCount} variant="outlined" color="secondary" page={page} onChange={paginateHandler}/>
    </Stack>
    )
}
export default Paginator;