import React from 'react'
import {Box} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import {useDispatch, useSelector} from "react-redux";
import {setAllPosts, setAPost, sortPosts} from "../features/link/postsSlice";
import {setSorting} from "../features/link/sortingSlice";

let postHolderDefault = [];

function SortSelection(props) {
    const posts = useSelector((state) => state.posts.value);
    const sorting = useSelector((state) => state.sorting.value);
    const dispatch = useDispatch();


    //this is sorting component
    const handleChange = (event) => {
        let value = event.target.value.toString();
        let value0 = value.toString();
        if (value0 === "MostPoints") {
            //sort from the most points
            dispatch(sortPosts((function (a, b) { return b.points - a.points })));
        } else if (value0 === "LeastPoints") {
            console.log("least")
            //sort from the least points
            function comparator (a, b) { return a.points - b.points };
            dispatch(sortPosts(comparator));
        }
        dispatch(setSorting(value0));  //set the state to refresh frontend
    };

let mySorter;
    if(posts.length > 1) {
         mySorter = <Box mt={1} sx={{minWidth: 150}}>
            <FormControl fullWidth>
                <InputLabel variant="standard"> <i style={{color: 'orange'}}>sort</i> </InputLabel>
                <NativeSelect color="warning" value={sorting} onChange={handleChange}>
                    <option value="MostPoints">Most Points</option>
                    <option value="LeastPoints">Least Points</option>
                </NativeSelect>
            </FormControl>
        </Box>
    }

    return mySorter;

}
export default SortSelection;