import { Avatar } from '@mui/material';
import React from 'react';
import styled from 'styled-components';


const StyledAvatar = styled(Avatar)`
    margin: 5px 15px 5px 5px;
`

const AvatarUser = ({ recipient, recipientEmail }) => {
    return (
        recipient?.photoURL ?
            <StyledAvatar src={recipient.photoURL} />
            : <StyledAvatar>
                {recipientEmail && recipientEmail[0].toUpperCase()}
            </StyledAvatar>
    )
}

export default AvatarUser;