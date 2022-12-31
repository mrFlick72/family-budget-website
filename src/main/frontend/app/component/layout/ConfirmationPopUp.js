import React from "react"
import YesAndNoButtonGroup from "./YesAndNoButtonGroup";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {Check} from "@mui/icons-material";

export default ({confirmationHandler, modalTitle, modalMessageBody, open, handleClose}) =>
    <Dialog onClose={handleClose} open={open} fullWidth scroll="paper">
        <DialogTitle>{modalTitle}</DialogTitle>

        <DialogContent>
            {modalMessageBody}
        </DialogContent>
        <DialogActions>
            <YesAndNoButtonGroup yesIcon={<Check/>}
                                 yesFun={confirmationHandler}
                                 noFun={handleClose}
                                 buttonMessages={{
                                     "noLabel": "No",
                                     "yesLabel": "Yes"
                                 }}/>
        </DialogActions>
    </Dialog>