import { useState } from "react";
import { CallGPT } from "./api/gpt";
import { DiaryInput } from "./Components/DiaryInput";
import styled from "styled-components";
import logo from "./assets/logo.png";
import { DiaryDisplay } from "./Components/DiaryDisplay";

const dummyData = JSON.parse(`
{ "title": "코딩 강의와 버그 해결", "thumbnail": "https://source.unsplash.com/1600x900/?coding", "summary": "코딩 강의를 듣고 프로젝트에서 발생한 버그를 스택오버플로에서 검색하여 해결하지 못했지만, GPT를 사용하여 문제를 해결했습니다. 이 방법이 개발 실력에 도움이 될까요?", "emotional_content": "오늘은 코딩 강의를 들었습니다. 강의를 듣고 나서 프로젝트를 진행하던 중 버그가 많이 발생했습니다. 처음에는 스택오버플로에서 해당 버그에 대해 검색을 해보았지만, 원하는 답을 얻지 못했습니다. 저의 능력으로는 문제를 해결할 수 없다는 생각에 낙담했습니다. 그런데, 교수님께서 GPT를 사용하여 버그를 해결하는 방법을 알려주셨습니다. 이 방법을 사용하여 문제를 해결했고, 프로젝트를 성공적으로 완료했습니다. 하지만, 제 개발 실력에 도움이 됐을까요? 과연 이렇게 해결하는 것이 개발자로서 성장하는 데 도움이 될까요?", "emotional_result": "이번 경험을 통해 저는 자신의 능력에 대한 의문과 불안을 느꼈습니다. 스택오버플로에서 해결책을 찾지 못한 것으로 보아, 제 개발 실력이 부족하다는 생각이 들었습니다. 또한, GPT를 사용하여 문제를 해결했지만, 이 방법이 제 실력을 향상시키는 데에는 도움이 되지 않았을까 하는 의문도 들었습니다.", "analysis": "이번 상황에서는 저의 개발 실력에 대한 의문과 불안이 두드러졌습니다. 개발자로서 성장하기 위해서는 스택오버플로에서의 검색뿐만 아니라 다양한 학습과 경험이 필요합니다. GPT를 사용하여 문제를 해결한 것은 임시적인 해결책이었을 수 있으며, 제 실력 향상에는 한계가 있을 수 있습니다. 따라서, 제 개발 실력을 향상시키기 위해서는 더 많은 학습과 실전 경험이 필요할 것입니다.", "Action_list": [ "스택오버플로에서만 의존하지 말고, 다양한 자료와 학습 자료를 참고하여 개발 실력을 향상시킬 것", "다른 개발자들과의 소통과 협업을 통해 실전 경험을 쌓을 것", "정기적으로 자기 평가를 진행하여 개발 실력을 체크하고 개선할 것" ] }
`);

function App() {
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async (userInput) => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `${userInput}`,
      });
      setData(JSON.parse(message));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(">>data", data);

  const handleSubmit = (userInput) => {
    handleClickAPICall(userInput);
  };

  return (
    <AppContainer>
      <AppTitle>
        심리상담사 GPT, AI 회고록 <img width={"100px"} src={logo} alt="logo" />
      </AppTitle>
      <DiaryInput isLoading={isLoading} onSubmit={handleSubmit} />
      <button onClick={handleClickAPICall}>GPT API call</button>
      <DiaryDisplay isLoading={isLoading} data={data} />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
`;

const AppTitle = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  font-family: "Noto Sans KR";
`;
