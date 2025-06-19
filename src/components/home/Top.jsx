import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; // ✅ Autoplay 추가
import 'swiper/css';
import 'swiper/css/pagination';
import '../../pages/style/MainPage.css'; // 필요 시 사용
import image1 from '../../images//home/home1.svg';
import image2 from '../../images//home/home2.svg';
import image3 from '../../images//home/home3.svg';
import image4 from '../../images//home/home4.svg';
import image5 from '../../images//home/home5.svg';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
const BaseSlide = styled.div`
  position: relative;
  min-width: 800px;
  width: 60%;
  height: 85%;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 0 50px;

  img {
    height: 60%;
  }
`;

// 개별 슬라이드
const Slide1 = styled(BaseSlide)`
  min-width: 800px;
  background: linear-gradient(180deg, #edf3ff 0%, #97b5f1 100%);
`;

const Slide2 = styled(BaseSlide)`
  background: linear-gradient(326deg, #effffb 0%, #a6f4e1 100%);
`;

const Slide3 = styled(BaseSlide)`
  background: linear-gradient(325deg, #f9f3ff 0%, #cfa0ff 100%);
`;
const Slide4 = styled(BaseSlide)`
  background: linear-gradient(333deg, #fff4f7 0%, #f79dba 100%);
`;

const Slide5 = styled(BaseSlide)`
  background: linear-gradient(333deg, #fffffb 0%, #fffd92 100%);
`;
const RightBox = styled.div`
  height: 60%;
  margin: 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.span`
  font-size: 2rem;
  font-weight: 700;
`;
const Comment = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

const Content = styled.p`
  min-width: max-content;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Btn = styled.span`
  color: rgba(106.54, 106.54, 106.54, 0.8);
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  position: absolute;
  bottom: 20px;
  right: 40px;
  cursor: pointer;
`;

export default function Top() {
  const navigate = useNavigate();

  const handleWishClick = () => {
    navigate('/products');
  };

  const handleMeddlingClick = () => {
    navigate('/meddling');
  };

  const handleChallengeClick = () => {
    navigate('/challenges');
  };

  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // ✅ 3초마다 자동 슬라이드
        className="mySwiper"
        loop={true}
      >
        <SwiperSlide>
          <Slide2>
            <img src={image2} alt={`Slide 1`} />
            <RightBox>
              <Title>티끌모으기</Title>
              <Comment>
                티끌 모아 거지 탈출!! <br />
                흔히 돈 굳었다고 하죠? 똑똑하고 신중한 소비로 티끌을 모아보세요!
              </Comment>
              <Content>
                “검소한 소비를 지향하는 MZ 세대들이 돈의 흐름을 쉽게 이해하고,
                재미있게 지출을 관리할 수 있는 방법은 없을까? ” 에서 시작된{' '}
                <br />
                ‘티끌모으기’는 친구와 함께 소비패턴을 분석하고 관리하는
                서비스입니다.
              </Content>
            </RightBox>
          </Slide2>
        </SwiperSlide>
        <SwiperSlide>
          <Slide1>
            <img src={image1} alt={`Slide 1`} />
            <RightBox>
              <Title>소비 일기</Title>
              <Comment>이번 달 나 뭐 샀지?! 가계부에서 확인해보세요!</Comment>
              <Content>
                가계부를 작성하고, 일별·월별 소비내역과 합계를 캘린더 형식으로
                저장하여 한 눈에 확인할 수 있습니다. <br />
                구매 완료된 위시 상품 또한 자동으로 가계부에 포함됩니다.
              </Content>
            </RightBox>
          </Slide1>
        </SwiperSlide>
        <SwiperSlide>
          <Slide3>
            <img src={image3} alt={`Slide 1`} />
            <RightBox>
              <Title>위시리스트</Title>
              <Comment>
                이제 충동적인 구매는 그만!
                <br />
                위시리스트에 담아두고 친구 조언 들어보자!
              </Comment>
              <Content></Content>
            </RightBox>
            <Btn onClick={handleWishClick}>위시 담으러 가기&gt;</Btn>
          </Slide3>
        </SwiperSlide>
        <SwiperSlide>
          <Slide4>
            <img src={image4} alt={`Slide 1`} />
            <RightBox>
              <Title>참견소</Title>
              <Comment>
                훈수의 시대, 친구의 소비에 참견할 수 있다고?! <br />
                친구의 소비 고민을 해결해주고 내 고민도 해결 받자!{' '}
              </Comment>
              <Content>
                친구들에게 공유된 위시들에 대한 피드백(훈수)을 받아,
                <br />
                상품의 필요성·효율성·가치를 보다 객관적으로 판단할 수 있습니다.
              </Content>
            </RightBox>
            <Btn onClick={handleMeddlingClick}> 참견소 방문하기&gt;</Btn>
          </Slide4>
        </SwiperSlide>
        <SwiperSlide>
          <Slide5>
            <img src={image5} alt={`Slide 1`} />
            <RightBox>
              <Title>챌린지</Title>
              <Comment>
                티끌모으기 작심삼일이야.. 어떻게 하지?
                <br />
                친구들과 함께 티끌 모아보자!
              </Comment>
              <Content></Content>
            </RightBox>
            <Btn onClick={handleChallengeClick}>챌린지 참여하러 가기&gt;</Btn>
          </Slide5>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
