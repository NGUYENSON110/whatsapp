import React from 'react';
import styled from 'styled-components';
import { useRecipient } from '../hooks/useRecipient';
import RecipientAvatar from "../avatar/avatar";
import { Link } from "react-router-dom"

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-all;

    :hover{
        background-color: #e9eaeb;
    }
`
const StyledLink = styled(Link)`
    text-decoration: none;
    display: flex;
    width: 100vh;
`   
const StyledLinkEmail = styled.span`
    /* display: flex;
    text-align: center;
    justify-content: center; */
    margin-top: 10px;
`

const ConversationSelect = ({ id, conversationUsers }) => {
    const { recipient, recipientEmail } = useRecipient(conversationUsers)

    // console.log("zzzzzzz", recipientEmail)
    // const router = useRouter();
    const onSelectConversation = () => {
    }

    return (
        <StyledContainer onClick={onSelectConversation}>
            <StyledLink to="/conversation" >
                <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
                <StyledLinkEmail>
                    {recipientEmail}
                </StyledLinkEmail>
            </StyledLink>
            {/* {id} - {JSON.stringify(conversationUsers)} */}
        </StyledContainer>
    )
}

export default ConversationSelect;