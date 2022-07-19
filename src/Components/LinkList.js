import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import SortSelection from "./SortSelection";
import AddLink from "./AddLink";
import Paginator from "./Paginator";
import MyListItem from "./MyListItem"

import {useDispatch, useSelector} from "react-redux";
import {Box, Grid} from "@mui/material";

function LinkList() {

    const index = useSelector((state) => state.sorting.index);

    let id = 100; //id required for creating new links

    //state for pagination

    return (<div>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <AddLink id={++id}/>
                <Grid item container display="flex" justifyContent="center" minWidth={350}>
                    <Grid item xs={12} display="flex" justifyContent="center" minWidth={350}>
                        <SortSelection/>
                    </Grid>
                    <Grid item xs={12} sx={{borderBottom: "1px solid grey"}} display="flex" justifyContent="center">
                        <MyListItem index={index}/>
                    </Grid>
                    <Grid item xs={12} sx={{borderBottom: "1px solid grey"}} display="flex" justifyContent="center">
                        <MyListItem index={index + 1}/>
                    </Grid>
                    <Grid item xs={12} sx={{borderBottom: "1px solid grey"}} display="flex" justifyContent="center"
                          minWidth={350}>
                        <MyListItem index={index + 2}/>
                    </Grid>
                </Grid>
            </List>
            <Grid item xs={12} display="flex" justifyContent="center">
                <Paginator/>
            </Grid>

        </div>
    );
}

export default LinkList;