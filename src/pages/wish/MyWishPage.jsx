import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MywishPlannedComponent from "../../components/wish/MywishPlannedComponent";
import MywishPurchasedComponent from "../../components/wish/MywishPurchasedComponent";
import Colors from "../../constanst/color.mjs";
import { getMyWishPlanned, getMyWishPurchased } from "../../api/wish/wishAPI";

const MyWishPageContainer = styled.div`
    width:70%;
    max-width: 100%;
    margin: 120px auto;
    margin-Bottom: 150px;
`;

const MyWishContainer = styled.div`
    margin: 50px auto;
    width:100%;
    display: flex;
    flex-direction: column;
`;

// 제목
const MyWishTitleName = styled.div` 
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

const TabMyWishContainer = styled.div`

`;

const TopMyWishInnerContainer = styled.div`

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

function MyWishPage() {
    const [selectedTab, setSelectedTab] = useState("구매 예정");

    const [plannedItems, setPlannedItems] = useState([]);
    const [purchasedItems, setPurchasedItems] = useState([]); 

    // API 연동
    useEffect(() => {
        const fetchAll = async () => {
            try {
            const planned = await getMyWishPlanned();   // 구매 예정 목록 조회
            const purchased = await getMyWishPurchased();   // 구매 완료 목록 조회

            setPlannedItems(planned.myWishPlannedLst);
            setPurchasedItems(purchased.myWishPurchasedLst);
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
        <MyWishPageContainer>
            <MyWishContainer>
                <MyWishTitleName>나의 위시리스트 목록</MyWishTitleName>
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
                <TabMyWishContainer>
                    <TopMyWishInnerContainer>
                        {selectedTab === "구매 예정" &&
                            plannedItems.length > 0 &&
                            plannedItems.map((item, index) => (
                                <MywishPlannedComponent key={index} wish={item} />
                        ))}
                        {selectedTab === "구매 완료" &&
                            purchasedItems.length > 0 &&
                            purchasedItems.map((item, index) => (
                                <MywishPurchasedComponent key={index} wish={item} />
                        ))}
                        {selectedTab === "구매 예정" &&plannedItems.length == 0 && (
                                <NoResultContainer>
                                <NoResultTitle>해당하는 위시가 없습니다.</NoResultTitle>
                                <NoResultSubText>사고 싶은 상품을 위시에 담아보세요!</NoResultSubText>
                            </NoResultContainer>
                        )}
                        {selectedTab === "구매 완료" &&purchasedItems.length == 0 && (
                                <NoResultContainer>
                                <NoResultTitle>해당하는 위시가 없습니다.</NoResultTitle>
                                <NoResultSubText>사고 싶은 상품을 위시에 담아보세요!</NoResultSubText>
                            </NoResultContainer>
                        )}
                    </TopMyWishInnerContainer>
                </TabMyWishContainer>
            </MyWishContainer>
        </MyWishPageContainer>
    );
};

export default MyWishPage;
