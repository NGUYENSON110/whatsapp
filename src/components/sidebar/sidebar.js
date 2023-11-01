import { Avatar, Button, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat"
import MoreVerticalIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useAuthState } from "react-firebase-hooks/auth";
import * as EmailValidator from "email-validator";
import { addDoc, collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import ConversationSelect from "../conversation/conversation"



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

    const [logginInUser, _loading, _error] = useAuthState(auth);
    const [isOpenNewConversationDiaLog, setIsopenNewConversationDiaLog] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState('');
    const isInvitingSelf = recipientEmail === logginInUser?.email

    const toggleNewConversationDiaLog = (isOpen) => {
        setIsopenNewConversationDiaLog(isOpen)
        if (!isOpen) {
            setRecipientEmail('')
        }
    }

    const closeNewConversationDialog = () => {
        toggleNewConversationDiaLog(false)
    }


    const createConversation = async () => {
        if (!recipientEmail) return

        if (EmailValidator.validate(recipientEmail) && !isInvitingSelf && !isConversationAlreadyExists(recipientEmail)) {
            // Tạo ra conversation mới , check 

            await addDoc(collection(db, 'conversations'), {
                users: [logginInUser?.email, recipientEmail]
            })
        }
        closeNewConversationDialog()
    }

    // Lấy đoạn hội thoại
    const queryGetConversationForCurrentUser = query(collection(db, 'conversations'), where('users', 'array-contains', logginInUser?.email))
    const [conversationSnapshot, __loading, __error] = useCollection(queryGetConversationForCurrentUser)

    console.log("asd", conversationSnapshot)
    const isConversationAlreadyExists = (recipientEmail) =>
        conversationSnapshot?.docs.find(conversation => (conversation.data().users.includes(recipientEmail)))


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

                <Tooltip title={logginInUser?.email} placement='right'>
                    <StyledUserAvatar src={logginInUser?.photoURL || ''} />
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

            <StyledSidebarButton onClick={() => {
                toggleNewConversationDiaLog(true)
            }}>
                START NEW A CONVERSATION
            </StyledSidebarButton>

            {/* List of conversation */}

            {conversationSnapshot?.docs.map(item =>
                <ConversationSelect key={item.id} id={item.id} conversationUsers={item.data().users}
            />)}

            <Dialog open={isOpenNewConversationDiaLog} onClose={closeNewConversationDialog}>
                <DialogTitle>New Conversation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a Google email address for the user you with
                    </DialogContentText>
                    <TextField
                        autoFocus
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={recipientEmail}
                        onChange={e => {
                            setRecipientEmail(e.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeNewConversationDialog}>Cancel</Button>
                    <Button disabled={!recipientEmail} onClick={createConversation}>Create</Button>
                </DialogActions>
            </Dialog>
        </StyledContainer>
    )
}


export default Sidebar;