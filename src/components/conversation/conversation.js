import React from 'react';
import styled from 'styled-components';
import { useRecipient } from '../hooks/useRecipient';


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

const ConversationSelect = ({ id, conversationUsers }) => {
   

    const { recipient, recipientEmail } = useRecipient(conversationUsers)

    console.log("zzzzzzz", recipientEmail)

    return (
        <StyledContainer>
            <span>
                {recipientEmail}
            </span>
            {/* {id} - {JSON.stringify(conversationUsers)} */}
        </StyledContainer>
    )
}

export default ConversationSelect;