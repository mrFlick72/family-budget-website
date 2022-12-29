import React from "react";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {v1 as uuidv1} from "uuid";

export default ({icon, text, openPopupHandler}) => {
    return <ListItem key={uuidv1()} disablePadding component="a" onClick={openPopupHandler}>
        <ListItemButton>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={text}/>
        </ListItemButton>
    </ListItem>
}