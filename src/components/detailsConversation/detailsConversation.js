import styled from '@emotion/styled';
import React from 'react';
import Sidebar from '../sidebar/sidebar';

const StyledContainer = styled.div`
    display: flex;

`

const DetailsConversation = () => {
    return (
        <StyledContainer>
            {/* Bổ sung Head */}
            <Sidebar />
            <h1>MESSAGE</h1>
        </StyledContainer>
    )
}

export default DetailsConversation;