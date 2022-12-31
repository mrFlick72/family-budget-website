import * as PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import {LocalOffer} from "@mui/icons-material";
import React from "react";

export function SearchTagsPageMenuItem({text}) {
    return <MenuItem
        icon={<LocalOffer/>}
        link="#/search-tags"
        text={text}/>
}

SearchTagsPageMenuItem.propTypes = {text: PropTypes.string};