import { Avatar, Button, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat"
import MoreVerticalIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';



const StyledContainer = styled.div`
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;
    border-right: 1px solid whitesmoke;
`

const StyledHeader = styled.div`
    display:flex;
    position: sticky;
    top:0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`

const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 2px;

`

const StyledSidebarButton = styled(Button)`
    width: 100%;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
`

const StyledSreachInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
`

const StyledUserAvatar = styled(Avatar)`
    cursor: pointer;    
    :hover{
        opacity: 0.8;
    }
`

const Sidebar = () => {
    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log("ERROR LOGGING OUT", error)
        }
    }


    return (
        <StyledContainer>
            <StyledHeader>

                <Tooltip title="USER EMAIL" placement='right'>
                    <StyledUserAvatar />
                </Tooltip>

                <div>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVerticalIcon />
                    </IconButton>

                    <IconButton onClick={logOut}>
                        <LogoutIcon />
                    </IconButton>
                </div>

            </StyledHeader>

            <StyledSearch>
                <SearchIcon />
                <StyledSreachInput placeholder="Search in conversations" />
            </StyledSearch>

            <StyledSidebarButton>
                START NEW A CONVERSATION
            </StyledSidebarButton>

            {/* List of conversation */}
        </StyledContainer>
    )
}


export default Sidebar;