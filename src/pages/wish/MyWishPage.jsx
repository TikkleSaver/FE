import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MywishPlannedComponent from "../../components/wish/MywishPlannedComponent";
import MywishPurchasedComponent from "../../components/wish/MywishPurchasedComponent";

const MyWishPageContainer = styled.div`
    width:70%;
    max-width: 100%;
    margin: 120px auto;
`;

const MyWishContainer = styled.div`
    margin: 50px auto;
    width:100%;
    display: flex;
    flex-direction: column;
`;

const MyWishTitleName = styled.div` // 제목
    margin: 70px 0px;
    color: black;
    font-size: 40px;
    font-family: Inter;
    font-weight: 700;
    line-height: 30px;
    word-wrap: break-word
`;

const TabContainer = styled.div`    // 구매 예정 구매 완료 구분 탭
    border-bottom: 2px solid #e0e0e0; 
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

    color: ${(props) => (props.$active === "true" ? "#333333" : "#606060")};
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
        props.$active === "true" ? "#FFB129" : "transparent"};
        z-index: 1;
        transition: background-color 0.2s ease;
        text-align: center;
    }
`;

const TabMyWishContainer = styled.div`

`;

const TopMyWishInnerContainer = styled.div`

`;

function MeddlePage() {
    const [selectedTab, setSelectedTab] = useState("구매 예정");

    const [plannedItems, setPlannedItems] = useState([1, 2, 3, 4, 5]);  // 더미 데이터
    const [purchasedItems, setPurchasedItems] = useState([1, 2, 3, 4, 5, 6]); // 더미 데이터

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
                                plannedItems.map((item, index) => (
                                    <MywishPlannedComponent key={index} />
                                ))}
                            {selectedTab === "구매 완료" &&
                                purchasedItems.map((item, index) => (
                                    <MywishPurchasedComponent key={index} />
                                ))}
                    </TopMyWishInnerContainer>
                </TabMyWishContainer>
            </MyWishContainer>
        </MyWishPageContainer>
    );
};

export default MeddlePage;
