<!-- @format -->

## My-Jarvis

DART API 가 제공하는 상장회사의 주요 제무정보를 가시적으로 전달하는 WEB APP

-go to page: <https://portfolio-2020-my-jarvis.netlify.app/>

### 주요기능

**할일목록(to-do)**

- 로그인 및 사용자,날짜 별 데이터 저장과 삭제
- 주제별 체크리스트와 하루달성도의 표현
- 시간대 설정과 시간 달성시 오토체크 여부의 옵션
- 3일간 목표달성율의 증/감 율 표현

**한일목록(what-done)**

- 카테고리별 소모시간의 가시적인 조회
- 임의의 기간동안 카테고리 별 소모시간 총 합 순위별 조회
- 임의의 카테고리의 날짜 별 소모시간 조회
- 카테고리 별 나만의 색깔 설정 및 저장 수정 삭제 가능

### 기술요점

- firebase 를 이용한 실시간 데이터 관리
- 컴포넌트별 module css 스타일링
- 요일 별 state 관리
- 유저의 option 에 따른 기능적 선택사항
- 각 state 의 상호작용

### App 구조

<img src="/App.png" width="100%" height="100%" title="앱 구조" alt="앱 구조"></img>

### back-end 구조

firebase 에서 제공하는 데이터 베이스 솔루션 (데이터 평면화)을 최대한 적용 해 보고자 했습니다.

<pre>
<code>
//Example
  // 각 id 별 uuid 
  t1LMdgqqGyU3hKGSetfpwPFiyHu1:{
      perofrmence:{
        todoPerformance:{
          20201104:{
            checkList:0,
            checked:0
          }
        },
        whatDonePerformance:{
          20201104:[
            {
              category:'공부',
              doingTime:360
            },
            {
              category:'휴식',
              doingTime:150
            }
          ]
        },
      },
      todoState:{
        todoList:{
        // Date.now()를 이용한 key | id 
          56465231243:{
            autoCheck:false,
            checked:false,
            id:'56465231243',
            topic:'건강',
            what:"아침 밥 먹기",
            until:'17:50'
          }
        },
        topicList:{
          1234564564:{
            complete:false,
            id:'1234564564',
            made:'2020.11.04',
            topic:"건강"
          }
        }
      },
      whatDoneState:{
        whatDoneList:{
          12345641235:{
            id:'12345641235',
            category:'공부',
            startTime:'08:30',
            endTime:'14:30',
            whatDo:'데이터베이스 평면화 공부'
          }
        },
        customCategoryList:{
          1235612546:{
            id:'1235612546',
            category:'공부'
            color:'#ffffff'
          }
        }
      }
    }
</code>
</pre>

#### 요약

최상 위 목록 : uuid
하위목록 : performance, todoState, whatDoneState

perfrommance 하위목록: todoPerformance[key = 날짜], whatdonePerformance[key = 날짜]

todoState 하위목록: todoList[key = now()],topicList[key = now()]

WhatDoneState 하위목록: whatDoneList[key = now()], customCetegoryList[key = now()]

- **데이터의 추가 및 수정이 잦은 항목은 자료구조를 객체로 선정하였습니다.**

- **데이터의 수정보다 읽기가 더 많은경우 배열을 선택하였습니다.**

### front-end 구조

- 랜딩페이지로 시작하며 메인페이지는 비동기적으로 로드됩니다.

- 로그인은 firebase 에서 제공하는 google, github , guset 솔루션을 통해 구현했습니다.

- 상태관리 라이브러리를 사용하지 않고 컴포넌트 합성 및 상속으로 프로젝트를 만들었습니다.

- 컴포넌트의 상속관계와 유사하게 폴더구조가 짜여져 있습니다.

- 각 컴포넌트별 module.css 로 스타일링을 했습니다.

- 최적화는 대부분 React.memo 로 진행했으며 state 의 변화가 잦거나 , 의미없는 랜더링의 비용이 크다고 생각되는 부분만 적용했습니다.

- SPA 의 http path 의 문제는 배포 페이지인 netlify 에서 제공하는 re-direction 솔루션으로 해결 했습니다.

### 향후 추가 할 기능들

사용하고 싶은 마음에 제작한 것이지만 노트앱과 병행하기는 번거로운 점이 많아 사용하지 않고 있습니다.
추가 할 점보다는 새로운 노트앱을 만들게 된다면 이러한 기능을 포함하고 있는 노트앱을 만들고 싶습니다.
