import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import styled from "styled-components";
import Colors from "../../constanst/color.mjs";
import cameraIcon from "../../assets/camera.svg";
import publicLockIcon from "../../assets/publicLockIcon.svg";
import privateLockIcon from "../../assets/privateLockIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import plusIcon from "../../assets/plusIcon.svg";
import { updateChallenge, deleteChallenge } from "../../api/challenge/challengeApi";
import { fetchChallenge } from "../../api/challenge/challengeDetailApi";

const UpdateChallengeWrapper = styled.div`
  width:50%;
  max-width: 100%;
  margin: 120px auto;
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 13px;
  position: relative;

`;

const UpdateChallengeText= styled.div`
  font-size: 25px;
  font-weight:300;
  margin-bottom: 20px;

`;

const UpdateChallengeImgContainer = styled.div`
  width: 80%;
  aspect-ratio: 4 / 3;
  background-color: ${Colors.secondary50};
  margin-bottom:20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  border: 1.5px solid ${Colors.secondary50};;
  border-radius: 20px;
  overflow: hidden;
`;

const UpdateChallengeImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoneImgIcon = styled.img`
  width: 75px;
  height: 75px;
  opacity: 0.5;
`;

const HiddenInput = styled.input`
  display: none;
`;


const ChallengeNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width:100%;
  margin: 10px auto;
  
`;
const ChallengeNameText = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-left: 3px;
  margin-bottom:5px;
`;

const ChallengeNameInput = styled.input`
  width: 100%;
  padding-top:15px;
  padding-left:10px;
  padding-bottom:15px;
  border: 1px solid ${Colors.secondary50};
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  outline: none;

   &::placeholder {
    color: ${Colors.secondary100};
    font-weight: 400;
  }
`;

const ChallengeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width:100%;
  margin: 10px auto;

`;
const ChallengeInfoText = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-left: 3px;
  margin-bottom:5px;
`;

const ChallengeInfoInput = styled.textarea`
  width: 100%;
  height: 140px;
  padding-top:15px;
  padding-left:10px;
  padding-bottom:15px;
  border: 1px solid ${Colors.secondary50};
  border-radius: 10px;
  resize: none;
  font-size: 16px;
  font-weight: 600;
  outline: none;

   &::placeholder {
    color: ${Colors.secondary100};
    font-weight: 400;
  }
`;

const CharCount = styled.div`
  position: absolute;
  right: 0px;
  bottom: 10px; 
  font-size: 12px;
  color: ${Colors.secondary100};
`;

const ChallengeCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width:100%;
  margin: 10px auto;
  
`;

const ChallengeCategoryText = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-left: 3px;
  margin-bottom:10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 7px;


`;

const CateButton = styled.button`
  background-color: ${(props) =>
    props.$active === "true" ? Colors.primary300 : "white"};
  color: ${(props) =>
    props.$active === "true" ? "white" : Colors.secondary200};
  border: 1px solid
    ${(props) =>
      props.$active === "true" ? Colors.primary300 : Colors.secondary100};
  padding: 5px 15px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.1s ease;

`;

const ChallengeIsPublicContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width:100%;
  margin: 10px auto;
  
`;

const ChallengeIsPublicText = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-left: 3px;

  
`;

const ChallengeIsPublicSubTextContainer = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-left: 3px;
  margin-bottom:18px;
`;


const ToggleContainer = styled.div`



`;
const PublicSubTextContainer = styled.div`
  display: flex;
  


`;
const PublicSubText = styled.div`
  font-size: 13px;
  color: ${Colors.secondary200};
  padding-top: 5px;


`;
const PublicSubIcon = styled.img`
  width:20px;
  padding-top: 3px; 
  padding-left: 1px;
 


`;
const PrivateSubTextContainer = styled.div`
   display: flex;


`;
const PrivateSubText = styled.div`
  font-size: 13px;
  color: ${Colors.secondary200};
  padding-top: 5px;


`;
const PrivateSubIcon = styled.img`
 width:20px;
 padding-top: 3px; 
 padding-left: 1px;


`;




const ChallengePublicSwitch =  styled.label`  

  position: absolute; 
  display: inline-block;
  width: 50px;
  height: 25px;
  margin-left: 10px;
  right: 0;
`;


const ChallengePublicSwitchInput = styled.input`  
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
    background-color: ${Colors.primary500};
  }
  &:checked + span:before {
    transform: translateX(25px);
  }
`;

const ChallengePublicSwitchSlider = styled.span`  
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${Colors.secondary100};
  transition: 0.4s;
  border-radius: 34px;
  &:before {
    position: absolute;
    content: "";
    height: 19px;
    width: 19px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;


const ChallengeCertifyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width:100%;
  margin: 10px auto;

`;
const ChallengeCertifyText = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-left: 3px;

`;

const ChallengeCertifyContainer = styled.div`
  position: relative; 
  width: 98%;
  margin-bottom:12px;
`;

const ChallengeCertifyInput = styled.input`
  width: 100%;
  padding: 15px 30px 8px 3px; 
  border: none;
  border-bottom: 1.5px solid ${Colors.secondary50};
  font-size: 16px;
  font-weight: 600;
  outline: none;

`;

const DeleteIcon = styled.img`
  position: absolute;
  right: -30px;
  bottom: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
const PublicCertifyBtn = styled.div`
 cursor: pointer;
 display:flex;
 margin-top: 10px;
 margin-bottom:50px;

`;

const PublicCertifyText = styled.div`
 font-size: 15px;
 color: ${Colors.secondary200};
 font-weight: 500;

`;
const PublicCertifyIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-top: 2.5px;
  margin-right:5px;
`;
const UpdateChallengeBtn = styled.div`
 font-size: 16px;
 color: white;
 font-weight: 400;
 padding: 12px 30px;
 background-color: ${Colors.primary};
 border: 1px solid ${Colors.primary500};
 border-radius:10px;
 cursor: pointer;
 margin-left: 20px;
`;

const DeleteChallengeBtn = styled.div`
 font-size: 16px;
 color: ${Colors.secondary500};
 font-weight: 400;
 padding: 12px 30px;
 background-color: ${Colors.secondary100};
 border: 1px solid ${Colors.secondary200};
 border-radius:10px;
 cursor: pointer;
`;

const BtnContainer = styled.div`
 position: absolute;  
 display:flex;
  right: 0;            
 bottom: 0;
`;



const ChallengeImageUpload = ({ onFileSelect, initialImage }) => {
    const [preview, setPreview] = useState(initialImage || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // 만약 initialImage가 바뀌면 preview도 업데이트
    if (initialImage) {
      setPreview(initialImage);
    }
  }, [initialImage]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.UpdateObjectURL(file);
      setPreview(imageUrl);
      onFileSelect(file);
    }
  };

  return (
    <>
      <UpdateChallengeImgContainer onClick={handleClick}>
        {preview ? (
          <UpdateChallengeImg src={preview} alt="preview" />
        ) : (
          <NoneImgIcon src={cameraIcon} alt="camera icon" />
        )}
        <HiddenInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </UpdateChallengeImgContainer>
    </>
  );
};


const UpdateChallengePage = () => {
    const navigate = useNavigate();
    const { challengeId } = useParams();

    const [nameText, setNameText] = useState("");
    const [infoText, setInfoText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isPublic, setIsPublic] = useState(true);
    const [certifyInputs, setCertifyInputs] = useState([{ id: Date.now(), value: "" }]);
    const categories = ["식비", "카페", "쇼핑", "건강", "취미", "교통비", "기타 생활비"];
    const categoryMap = {
        "식비": 1,
        "카페": 2,
        "쇼핑": 3,
        "건강": 4,
        "취미": 5,
        "교통비": 6,
        "기타 생활비": 7,
      };
    useEffect(() => {
      const fetchChallengeInfo = async () => {
        try {
          const data = await fetchChallenge(challengeId);
          setPreview(data.imgUrl);
          setNameText(data.title);
          setInfoText(data.description);
          setSelectedCategory(data.category);
          setIsPublic(data.isPublic);
          setCertifyInputs(data.missionMethods.map((method, idx) => ({
            id: Date.now() + idx,
            value: method
          })));
          console.log("챌린지 정보", data);
        } catch (error) {
          console.error("챌린지 불러오기 실패:", error);
        }
      };
      fetchChallengeInfo();
    }, [challengeId]);

  
    const handleAddCertifyInput = () => {
      setCertifyInputs([...certifyInputs, { id: Date.now(), value: "" }]);
    };
  
    const handleCertifyInputChange = (id, value) => {
      setCertifyInputs(certifyInputs.map(input =>
        input.id === id ? { ...input, value } : input
      ));
    };
  
    const handleDeleteCertifyInput = (id) => {
      setCertifyInputs(certifyInputs.filter(input => input.id !== id));
    };
  
    const handleUpdate = async () => {
        if (!nameText || !infoText || !selectedCategory || certifyInputs.length === 0) {
          alert("모든 항목을 입력해주세요.");
          return;
        }
      
        const missionMethods = certifyInputs.map((item) => item.value).filter(Boolean);
      
        const payload = {
          title: nameText,
          description: infoText,
          categoryId: categoryMap[selectedCategory],  
          publicStatus: isPublic,
          missionMethods,
        };
      
        const formData = new FormData();
      
        formData.append("request", new Blob([JSON.stringify(payload)], { type: "application/json" }));
  
        if (imageFile) {
          formData.append("file", imageFile);
        }
      
        try {
          await updateChallenge(challengeId, formData);
          alert("챌린지가 수정되었습니다.");
          navigate(`/challenge-info/${challengeId}`);
        } catch (error) {
          console.error("챌린지 수정 실패:", error);
          alert("수정 중 오류가 발생했습니다.");
        }
      };

      const handleDelete = async () => {
        if (!window.confirm("정말로 이 챌린지를 삭제하시겠습니까?")) return;
      
        try {
          await deleteChallenge(challengeId); 
          navigate('/myprofile'); 
        } catch (error) {
          console.error('챌린지 삭제 실패:', error);
          alert('챌린지 삭제에 실패했습니다. 다시 시도해주세요.');
        }
      };
  
    return (
        <UpdateChallengeWrapper>
          <UpdateChallengeText>
            챌린지 수정하기
          </UpdateChallengeText>
          <ChallengeImageUpload 
            onFileSelect={setImageFile} 
            initialImage={preview}
        />
          <ChallengeNameContainer>
            <ChallengeNameText>챌린지 이름</ChallengeNameText>
            <ChallengeNameInput
             value={nameText}
             onChange={(e) => setNameText(e.target.value)}
             placeholder="챌린지 명을 입력하세요"
           />
           <CharCount>{nameText.length}/20</CharCount>
          </ChallengeNameContainer>
          <ChallengeInfoContainer>
            <ChallengeInfoText>챌린지 소개</ChallengeInfoText>
            <ChallengeInfoInput
             value={infoText}
             onChange={(e) => setInfoText(e.target.value)}
             placeholder="챌린지 소개를 입력하세요"
           />
           <CharCount>{infoText.length}/300</CharCount>
          </ChallengeInfoContainer>
          <ChallengeCategoryContainer>
            <ChallengeCategoryText>카테고리</ChallengeCategoryText>
            <ButtonContainer>
              {categories.map((category) => (
                <CateButton
                  key={category}
                  $active={selectedCategory === category ? "true" : "false"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </CateButton>
              ))}
            </ButtonContainer>
          </ChallengeCategoryContainer>
          <ChallengeIsPublicContainer>
            <ChallengeIsPublicText>공개 설정</ChallengeIsPublicText>
            <ChallengeIsPublicSubTextContainer>
        {isPublic === "PRIVATE" ? (
          <PrivateSubTextContainer>
          <PrivateSubText>요청이 수락된 유저에게만 해당 챌린지를 공개합니다.</PrivateSubText>
          <PrivateSubIcon src={privateLockIcon} />
        </PrivateSubTextContainer>
        ) : (
          <PublicSubTextContainer>
          <PublicSubText>모든 유저에게 해당 챌린지를 공개합니다.</PublicSubText>
          <PublicSubIcon src={publicLockIcon} />
        </PublicSubTextContainer>
         
        )}
      </ChallengeIsPublicSubTextContainer>
        <ToggleContainer>
          <ChallengePublicSwitch>
          <ChallengePublicSwitchInput 
            type="checkbox" 
            checked={isPublic === "PRIVATE"} 
            onChange={() => setIsPublic(prev => (prev === "PUBLIC" ? "PRIVATE" : "PUBLIC"))}
            />
            <ChallengePublicSwitchSlider />
            </ChallengePublicSwitch>
            </ToggleContainer>
    
          </ChallengeIsPublicContainer>
          <ChallengeCertifyListContainer>
          <ChallengeCertifyText>인증 방식</ChallengeCertifyText>
    
          {certifyInputs.map((input, index) => (
            <ChallengeCertifyContainer key={input.id}>
              <ChallengeCertifyInput
                value={input.value}
                onChange={(e) => handleCertifyInputChange(input.id, e.target.value)}
              />
              {index !== 0 && (
                <DeleteIcon
                  src={deleteIcon}
                  onClick={() => handleDeleteCertifyInput(input.id)}
                />
              )}
            </ChallengeCertifyContainer>
          ))}
          <PublicCertifyBtn onClick={handleAddCertifyInput}>
            <PublicCertifyIcon src={plusIcon} />
            <PublicCertifyText>인증 방식 추가</PublicCertifyText>
          </PublicCertifyBtn>
        </ChallengeCertifyListContainer>
         
         <BtnContainer>
         <DeleteChallengeBtn onClick={handleDelete} >삭제하기</DeleteChallengeBtn>
         <UpdateChallengeBtn onClick={handleUpdate}>수정 완료</UpdateChallengeBtn>
         </BtnContainer>
        </UpdateChallengeWrapper>
      );
    }
  
  export default UpdateChallengePage;