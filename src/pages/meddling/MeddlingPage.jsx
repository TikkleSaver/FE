import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MeddlePreviewCard from "../../components/meddling/MeddlingPreviewCard";

const MeddlePageContainer = styled.div`
    width: 65%;
    max-width: 100%;
    margin: 120px auto;
`;

const MeddleContainer = styled.div`
  margin: 50px auto;
  width:100%;
  display: flex;
  flex-direction: column;
`;

function MeddlePage() {
    return (
        <MeddlePageContainer>
            <MeddleContainer>
                <MeddlePreviewCard/>
                <MeddlePreviewCard/>
                <MeddlePreviewCard/>
                <MeddlePreviewCard/>
                <MeddlePreviewCard/>
                <MeddlePreviewCard/>
                <MeddlePreviewCard/>
            </MeddleContainer>
        </MeddlePageContainer>
    );
};

export default MeddlePage;
