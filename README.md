
## My-Jarvis

DART API 가 제공하는 상장회사의 주요 제무정보를 가시적으로 전달하는 WEB APP

-go to page: <https://portfolio-2020-analisys-company.netlify.app/>

### 주요기능

**할일목록(to-do)**   

- 로그인 및 사용자,날짜 별 데이터 저장과 삭제
- 주제별 체크리스트와 하루달성도의 표현
- 시간대 설정과 시간 달성시 오토체크 여부의 옵션
- 3일간 목표달성율의 증/감 율 표현

**한일목록(what-done)**   

- 카테고리별 소모시간의 가시적인 조회
- 임의의 기간동안 카테고리 별 소모시간 총 합 순위별  조회
- 임의의 카테고리의 날짜 별 소모시간 조회
- 카테고리 별 나만의 색깔 설정 및 저장 수정 삭제 가능

### 기술요점

- firebase 를 이용한 실시간 데이터 관리
- 요일 별 state 관리 
- 유저의 option 에 따른 기능적 선택사항
- 각 state 의 상호작용 

### App 구조

<img src="/App.png" width="40%" height="30%" title="앱 구조" alt="앱 구조"></img>

### back-end 구조

firebase 에서 제공하는 데이터 베이스 솔루션 (데이터 평면화)을 최대한 적용 해 보고자 했습니다. 

<pre>
<code>

{
  {
  각 id 별 uuid:{
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
  }
}
</code>
</pre>

- **데이터 검색할 때마다 필요한 26800 개가 되는 상장회사 코드**

  -> state 저장 혹은 큰 용량의 반복되는 데이터 페칭보다 . firebase에 데이터를 저장해서 firebase 에서 제공하는 검색기능으로 state 와 네트워크의 부담을 최소화했습니다.

- **회사 코드는 존재하지만 데이터가 비어있는 경우가 많고 , dart api 의 문제시**

  ->firebase 에 백업데이터를 준비함으로써 예외의 상황에 대비하였습니다.

### front-end 구조

- **앱전체의 영향을 미치는 스테이트**
  => mob x 로 전역적으로 관리
- **부분에만 영향을 미치는 스테이트**
  => 각 컴포넌트의 스테이트로 관리

컴포넌트의 스테이트는 되도록 react 에서 제공하는 hook 솔루션을 이용하려 했습니다.

복잡성이 증가하면 mobx 에서 제공하는 useLocalObservable Hook 을 이용하기도 했습니다.

각각의 컴포넌트 내에서는 prop 이 있는게 가독성이 좋다 판단하여 최대한 porp을 활용 했습니다

### 향후 추가 할 기능들

- analisys of accounts 부분의 사용자가 자신의 커스텀 분석
- firebase 를 이용한 개별적 관리
- router 를 이용한 url 정보공유

