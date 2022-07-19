import React from 'react'
import Stack from "@mui/material/Stack";
import {Pagination} from '@mui/material';

function Paginator(props) {
    let page = props.page;
    let paginateHandler = props.paginateHandler;

    return (
    <Stack spacing={2}>
        <Pagination hideNextButton={true} hidePrevButton={true} count={33} variant="outlined" color="secondary" page={page} onChange={paginateHandler}/>
    </Stack>
    )
}
export default Paginator;