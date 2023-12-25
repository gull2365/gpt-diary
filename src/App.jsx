import { useState } from "react";
import { CallGPT } from "./api/gpt";

const dummyData = JSON.parse(`{
  {
    "title": "코딩의 고난과 열정",
    "thumbnail": "https://source.unsplash.com/1600x900/?coding,bug,challenge",
    "summary": "코딩 강의를 들었고, 프로젝트에서 버그가 많이 나와 스택오버플로에서 검색했지만 해결되지 않았다. 결국 GPT를 활용하여 문제를 해결했다. 이런 방식이 개발 실력 향상에 도움이 될까?",
    "emotional_content": "하루는 강의를 열심히 들으며 코딩의 세계에 빠져들었다. 하지만 프로젝트에서 발생한 버그들은 나를 괴롭히고, 검색을 통해 시간을 낭비했다. 마침내 GPT의 도움으로 문제를 해결했지만, 이것이 실력 향상에 도움이 되는 것일까? 고민이 많다.",
    "emotional_result": "혼란스러운 감정이 나를 휩쓸었다. 성취감과 동시에 불안감이 교차되어 미래의 개발 여정에 대한 두려움이 커졌다.",
    "analysis": "이 경험은 성취와 불안, 두 가지 감정을 동시에 경험하게 했다. 이는 새로운 도전에 대한 열망과 동시에 자신에 대한 불안감이 공존함을 나타낸다. 개발자로서의 성장은 어려움과 도전 속에서 나타날 수 있으며, 이는 학습과 발전의 기회로 받아들여져야 한다.",
    "action_list": [
      "자신에 대한 자신감을 강화하기 위해 성취한 작업을 기록하고 돌아보며 긍정적인 피드백을 주기.",
      "지속적인 학습과 도전을 통해 불안감을 극복하고 성장의 기회로 삼기.",
      "개발 커뮤니티에 참여하여 다양한 경험과 지식을 얻고, 협력과 지원을 통해 어려움을 극복하기."
    ]
  }  
}`);

function App() {
  const [data, setData] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `코딩 강의를 들었다. 프로젝트에 버그가 많이 나왔음. 스택오버플로에서 검색했지만 해결 안되었어.
      역시 gpt를 통해서 해결했다. 근데 이렇게 해결하는게 개발실력에 도움이 될까?`,
      });
      setData(JSON.parse(message));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleClickAPICall}>GPT API call</button>
      <div>title: {data?.title}</div>
      <div>
        isLoading: <span>{isLoading ? "Loading.." : "finish"}</span>
      </div>
    </>
  );
}

export default App;
