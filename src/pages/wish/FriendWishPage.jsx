import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import FriendwishPlannedComponent from "../../components/wish/FriendwishPlannedComponent";
import FriendwishPurchasedComponent from "../../components/wish/FriendwishPurchasedComponent";
import Colors from "../../constanst/color.mjs";
import { getFriendWishPlanned, getFriendWishPurchased } from "../../api/wish/wishAPI";

const FriendWishPageContainer = styled.div`
    width:70%;
    max-width: 100%;
    margin: 120px auto;
    margin-Bottom: 150px;
`;

const FriendWishContainer = styled.div`
    margin: 50px auto;
    width:100%;
    display: flex;
    flex-direction: column;
`;

// 제목
const FriendWishTitleName = styled.div` 
    margin: 70px 0px;
    color: black;
    font-size: 40px;
    font-weight: 700;
    line-height: 30px;
    word-wrap: break-word
`;

// 구매 예정 구매 완료 구분 탭
const TabContainer = styled.div`    
    border-bottom: 2px solid ${Colors.secondary100};  
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

const TabInnerContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 50px;
    position: relative;
    margin: 0 auto;
`;
const TabName = styled.div`
    position: relative;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;

    color: ${(props) => (props.$active === "true" ? Colors.secondary500 : Colors.greyTab)};
    display: flex;
    align-items: center;
    padding-left: 40px;

    &::after {
        content: "";
        position: absolute;
        bottom: -12px;
        left: 0;
        width: 140%;
        height: 2.5px;
        background-color: ${(props) =>
        props.$active === "true" ? Colors.yellowTab : "transparent"};
        z-index: 1;
        transition: background-color 0.2s ease;
        text-align: center;
    }
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

const TabFriendWishContainer = styled.div`

`;

const TopFriendWishInnerContainer = styled.div`

`;

function FriendWishPage() {
    const location = useLocation();
    const { friendId, friendName } = location.state || {};

    const [selectedTab, setSelectedTab] = useState("구매 예정");

    const [plannedItems, setPlannedItems] = useState([]);  
    const [purchasedItems, setPurchasedItems] = useState([]); 

    // API 연동
    useEffect(() => {
        const fetchAll = async () => {
            try {
            const planned = await getFriendWishPlanned(friendId);   // 구매 예정 목록 조회
            const purchased = await getFriendWishPurchased(friendId);   // 구매 완료 목록 조회

            setPlannedItems(planned.friendWishPlannedList);
            setPurchasedItems(purchased.friendWishPurchasedList);
            } catch (error) {
                console.error("API 불러오기 실패", error);
            }
        };
    fetchAll();
    }, []);

    const tabs = [
      { name: "구매 예정" },
      { name: "구매 완료" },
    ];

    return (
        <FriendWishPageContainer>
            <FriendWishContainer>
                <FriendWishTitleName>{friendName}의 위시리스트 목록</FriendWishTitleName>
                <TabContainer>
                    <TabInnerContainer>
                        {tabs.map((tab) => (
                        <TabName
                            key={tab.name}
                            $active={selectedTab === tab.name ? "true" : "false"}
                            onClick={() => setSelectedTab(tab.name)}
                        >
                            <span>
                            {tab.name}
                            </span>
                        </TabName>
                        ))}
                    </TabInnerContainer>
                </TabContainer>
                <TabFriendWishContainer>
                    <TopFriendWishInnerContainer>
                            {selectedTab === "구매 예정" &&
                            plannedItems.length > 0 &&
                                plannedItems.map((item, index) => (
                                    <FriendwishPlannedComponent key={index} wish={item} />
                                ))}
                            {selectedTab === "구매 완료" &&
                            purchasedItems.length > 0 &&
                                purchasedItems.map((item, index) => (
                                    <FriendwishPurchasedComponent key={index} wish={item} />
                                ))}
                            {selectedTab === "구매 예정" &&
                            plannedItems.length == 0 && (
                                    <NoResultContainer>
                                    <NoResultTitle>해당하는 위시가 없습니다.</NoResultTitle>
                                    <NoResultSubText>친구가 아직 위시를 담지 않았어요!</NoResultSubText>
                                </NoResultContainer>
                            )}
                            {selectedTab === "구매 완료" &&
                            purchasedItems.length == 0 && (
                                    <NoResultContainer>
                                    <NoResultTitle>해당하는 위시가 없습니다.</NoResultTitle>
                                    <NoResultSubText>친구가 아직 위시를 담지 않았어요!</NoResultSubText>
                                </NoResultContainer>
                            )}
                    </TopFriendWishInnerContainer>
                </TabFriendWishContainer>
            </FriendWishContainer>
        </FriendWishPageContainer>
    );
};

export default FriendWishPage;
