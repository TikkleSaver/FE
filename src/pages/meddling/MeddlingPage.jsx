import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MeddlePreviewCard from "../../components/meddling/MeddlingPreviewCard";
import { getWishList } from "../../api/wish/wishAPI";
import Colors from "../../constanst/color.mjs";

const MeddlePageContainer = styled.div`
    width: 65%;
    max-width: 100%;
    margin: 120px auto;
    margin-Bottom: 400px; 
`;

const MeddleContainer = styled.div`
  margin: 50px auto;
  width:100%;
  display: flex;
  flex-direction: column;
`;


const NoResultContainer = styled.div`

  flex-direction: column;
  justify-content: center;  
  align-items: center;     
  height: 60vh;        
  text-align: center;
  padding: 0 20px;         
  display: flex;
`;

const NoResultTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.secondary200};
  margin-bottom: 10px;
`;

const NoResultSubText = styled.div`
  font-size: 14px;
  color: ${Colors.secondary100};
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
                {wishItems.length == 0 && (
                        <NoResultContainer>
                        <NoResultTitle>해당하는 위시가 없습니다.</NoResultTitle>
                        <NoResultSubText>사고 싶은 상품을 위시에 담아보세요!</NoResultSubText>
                    </NoResultContainer>
                )}
            </MeddleContainer>
        </MeddlePageContainer>
    );
};

export default MeddlePage;
