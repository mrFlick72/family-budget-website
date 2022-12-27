import * as PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import {Search} from "@mui/icons-material";
import React from "react";

export function SearchTagsPageMenuItem({text}) {
    return <MenuItem
        icon={<Search/>}
        link="#/search-tags"
        text={text}/>
}

SearchTagsPageMenuItem.propTypes = {text: PropTypes.string};