import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MeddlePreviewCard from "../../components/meddling/MeddlingPreviewCard";
import { getWishList } from "../../api/wish/wishAPI";

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

    const [wishItems, setWishItems] = useState([]);  

    // API 연동
    useEffect(() => {
        const fetchAll = async () => {
            try {
            const wish = await getWishList();
    
            setWishItems(wish.wishList);
            } catch (error) {
                console.error("API 불러오기 실패", error);
            }
        };
    fetchAll();
    }, []);


    return (
        <MeddlePageContainer>
            <MeddleContainer>
                {wishItems.length > 0 &&
                    wishItems.map((item, index) => (
                        <MeddlePreviewCard key={index} wish={item} />
                ))}
            </MeddleContainer>
        </MeddlePageContainer>
    );
};

export default MeddlePage;
