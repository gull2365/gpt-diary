import { Input, Button } from "antd";
import { useState } from "react";
const { TextArea } = Input;

export const DiaryInput = ({ isLoading, onSubmit }) => {
  const [userInput, setUserInput] = useState(""); // 사용자 입력값

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    onSubmit(userInput);
  };

  return (
    <div>
      <TextArea
        value={userInput}
        onChange={handleUserInput}
        placeholder="오늘 일어난 일을 간단히 작성해주세요."
      />
      <Button loading={isLoading} onClick={handleClick}>
        GPT 회고록을 작성해줘!
      </Button>
    </div>
  );
};
