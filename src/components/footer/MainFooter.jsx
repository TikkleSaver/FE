import React from 'react'; // 추가
import styled from 'styled-components';
import logo from '../../images/logo.svg';
import Colors from '../../constanst/color.mjs';
import githubIcon from "../../assets/githubIcon.svg"

const StyledFooter = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${Colors.primary500};
  padding-top: 1rem;
  padding-bottom: 1rem;

 
`;

const FooterContainer = styled.div`
  .icon-container {
    display: flex;
    gap: 10px;
    margin-left: 40px;
  }
  .logo {
    width: 100px;
  }
  .github{
    width: 40px;
  }
  .symbol {
    display: none;
  }

  .copyright-notice {
    margin-left: 40px;
    color: white;
    margin-top: 25px;
    font-size: 14px;
    font-weight: 400;
  }

 
  }
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  font-size: 14px;
  color: white;
  margin-left: 40px;

`;

const TeamMember = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px; /* 원하는 너비 */
  margin-bottom: 3px;
`;

const Role = styled.div`
  flex-basis: 100px; /* 역할 고정 너비 */
  text-align: left;
`;

const Nickname = styled.div`
  flex-basis: 150px; /* 닉네임 고정 너비 */
  text-align: left;
`;

const MemberList = [
  { role: "팀장", nickname: "강도경" },
  { role: "팀원", nickname: "장고은 김희선 조은향" }
];

const Team = () => {
  return (
    <TeamContainer>
      {MemberList.map((member, index) => (
        <TeamMember key={index}>
          <Role>{member.role}</Role>
          <Nickname>{member.nickname}</Nickname>
        </TeamMember>
      ))}
    </TeamContainer>
  );
};

function MainFooter() {
  return (
    <StyledFooter>
      <FooterContainer>
        <div className="icon-container">
          <img src={logo} className="logo" />
          <a href="https://github.com/TikkleSaver">
            <img src={githubIcon} className="github" />
          </a>
        </div>
        <div className="copyright-notice">
          소프트웨어 시스템 개발 (TEAM 털썩)
          <br />
          Copyright 2025. TikkleSaver. All rights reserved.
        </div>
        <Team />
      </FooterContainer>
    </StyledFooter>
  );
}

export default MainFooter;