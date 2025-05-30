import styled from 'styled-components';

export const Logo = styled.img`
  width: 340px;
  margin: 10px 40px;
`;

export const checkBtn = styled.button`
  position: absolute;
  top: 30px;
  right: 10px;
  font-size: 11px;
  padding: 5px 8px;
  background-color: #51b69e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Pretendard';

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  height: 40px;
  width: 270px;
  font-size: 17px;
  background-color: #51b69e;
  color: white;
  border: none;
  font-weight: 600;
  border-radius: 6px;
  word-wrap: break-word;
  cursor: pointer;
  font-family: 'Pretendard';
  box-shadow: 1px 2px 8px #f3f3f3;

  &:disabled {
    background-color: #ccc; // 비활성화 시 색상
    cursor: not-allowed;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  width: fit-content;
  font-size: 12px;
  width: 290px;
  padding-left: 5px;
`;
export const HomeWrap = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
//메인화면 전체를 감싸주기 위한 스타일드 컴포넌트입니다.

export const FirstParagraph = styled.div`
  color: #595959;
  font-size: 14px;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 18.63px;
  letter-spacing: 0.49px;
  word-wrap: break-word;
  //width: 116px;
  height: 19px;
  /* @media screen and (max-width: 500px){
        width: 76.37px;
        height: 8px;
        font-size: 8px;
    } */
`; // Story community

export const SecondParagraph = styled.div`
  color: #5d5d5d;
  font-size: 40px;
  font-family: 'Pretendard';
  font-weight: 500;
  line-height: 53.23px;
  word-wrap: break-word;
  width: 405px;
  height: 41px;
  margin: 0;
  /* @media screen and (max-width: 500px){
        width: 155.66px;
        height: 23.00px;
        font-size: 20px;

    } */
`; //'나만의 문화일기'

export const ThirdParagraph = styled.div`
  color: black;
  font-size: 80px;
  font-family: 'Pretendard';
  font-weight: 700;
  line-height: 106.46px;
  letter-spacing: 2.8px;
  word-wrap: break-word;
  width: 393px;
  height: 77px;
  margin: 0;
  /* @media screen and (max-width: 500px){
        width: 221.11x;
        height: 38.71px;
        font-size: 50px;
    } */
`; //ARTORY

export const WrapLogin = styled.div`
  border-radius: 12px;
  display: flex;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  padding-bottom: 40px;
  flex-direction: column;
  align-items: center;
  &:focus {
    outline: none;
  }
`;
//로그인 폼 전체를 감싸는 스타일드 컴포넌트
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 10px;
`;
export const Input = styled.input`
  font-family: 'Pretendard';
  margin: 5px 0;
  border: none;
  width: 290px;
  padding-left: 10px;
  height: 40px;
  /* box-shadow: 1px 2px 8px #f3f3f3; */
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  color: #ababab;
  &:focus {
    outline: none;
  }
  border: ${(props) => (props.isError ? '1px solid #ff0558' : 'none')};
`;
//input 태그 스타일

export const WrapLink = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 5%;
`;
//아이디찾기 & 비밀번호 찾기 & 회원가입 링크를 감싸는 스타일드 컴포넌트

export const LinkStyle = styled.span`
  font-family: 'Pretendard';
  font-size: 13px;
  width: 100px;
`;
//아이디찾기 & 비밀번호 찾기 & 회원가입 링크 스타일

export const WrapSocialLogin = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20%;
`;
//네이버 로그인 & 카카오톡 로그인 버튼을 감싸는 스타일드 컴포넌트
export const LockStyle = styled.img`
  position: relative;
  bottom: 40%;
  left: 90%;
`;
