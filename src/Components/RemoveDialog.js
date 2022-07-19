import React from 'react'
import {Box} from "@mui/material";
import Fab from "@mui/material/Fab";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import {useDispatch, useSelector} from "react-redux";

const RemoveDialog = (props) => {

    const show = useSelector((state) => state.show.value)

    let handleDialogOpen = props.handleDialogOpen;
    let handleDialogClose = props.handleDialogClose;
    let open = props.open;
    let handleDeleteDialog = props.handleDeleteDialog;

    //disappearing delete box shows when you hover on a link
    let box;
    if (show) {
        box = <Box sx={{'& > :not(style)': {m: 1}}}>
            <Fab size="small" color="error" aria-label="edit" style={{position: 'absolute'}}>
                <DeleteOutlineIcon onClick={handleDialogOpen}/>
            </Fab>
        </Box>
    }
    return (<div>
        {box}
        <Dialog //delete dialog shows up when open is true
            open={open}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleDialogClose}>No</Button>
                <Button onClick={handleDeleteDialog} autoFocus> Yes </Button>
            </DialogActions>
        </Dialog>
    </div>);
}
export default RemoveDialog;