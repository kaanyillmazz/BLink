import React from 'react'
import {Box} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

function SortSelection(props) {
    let sorting = props.sorting;
    let setSorting = props.setSorting;
    let postsHolder = props.postsHolder;
    let postHolderDefault = props.postHolderDefault;

    //this is sorting component
    const handleChange = (event) => {
        let value = event.target.value.toString();
        let value0 = value.toString();
        if (sorting === "Default") {
            //save default sort (currently not working)
            postHolderDefault = JSON.parse(JSON.stringify(postsHolder)); }
        if (value0 === "MostPoints") {
            //sort from the most points
            postsHolder.sort(function (a, b) { return b.points - a.points });
        } else if (value0 === "LeastPoints") {
            //sort from the least points
            postsHolder.sort(function (a, b) { return a.points - b.points });
        } else if (value0 === "Default") {
            //get back the default sort
            postsHolder = JSON.parse(JSON.stringify(postHolderDefault)); }
        setSorting(value0);  //set the state to refresh frontend
    };

    return ( //return the component
        <Box mt={1} sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel variant="standard"> Sort </InputLabel>
                <NativeSelect value={sorting} onChange={handleChange}>
                    <option value="MostPoints">Most Points</option>
                    <option value="LeastPoints">Least Points</option>
                </NativeSelect>
            </FormControl>
        </Box>
    );
}
export default SortSelection;