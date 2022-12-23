import React from "react";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {v1 as uuidv1} from 'uuid';

const MenuItem = ({icon, text, link}) => {
    return <ListItem key={uuidv1()} disablePadding component="a" href={link}>
        <ListItemButton>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={text}/>
        </ListItemButton>
    </ListItem>
}

export default MenuItem