import { Input, Button, message } from "antd";
import { useState } from "react";
const { TextArea } = Input;
import { Title } from "./CommonStyles";
import styled from "styled-components";

export const DiaryInput = ({ isLoading, onSubmit, messageApi }) => {
  const [userInput, setUserInput] = useState(""); // 사용자 입력값
  // const [messageApi, contextHolder] = message.useMessage();

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    if (!userInput) {
      messageApi.open({
        type: "error",
        content: "일과를 작성해주세요.",
      });
      return;
    }
    messageApi.open({
      type: "success",
      content: "생성 요청 완료!",
    });

    onSubmit(userInput);
    setUserInput("");
  };

  return (
    <div>
      <Title>오늘의 일:</Title>
      <TextArea
        value={userInput}
        onChange={handleUserInput}
        placeholder="오늘 일어난 일을 간단히 작성해주세요."
        style={{ height: "200px" }}
      />
      <ButtonContainer>
        <Button loading={isLoading} onClick={handleClick}>
          GPT 회고록을 작성해줘!
        </Button>
      </ButtonContainer>
    </div>
  );
};

const ButtonContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
`;
