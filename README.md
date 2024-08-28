# todolist

투두 리스트 스터디

## 산출 목표 이미지
![68747470733a2f2f6d64626f6f7473747261702e636f6d2f696d672f4d61726b6574696e672f6769746875622f746f2d646f2d6c6973742f73656374696f6e2d332e706e67](https://github.com/user-attachments/assets/51c079e6-89e3-46d5-aed8-b6500d18659b)

## 기능 요구사항

1. 투두 리스트 작성 기능
   - input을 통해 투두의 내용을 작성하고 저장을 할 수 있다.
   - [선택사항] input 값에 대한 예외처리 적용(최대 20자 최소 6자)
   - 저장한 투두는 고유번호, 내용, 상태, 작성 시간 값을 유지한다.
   - 상태값의 경우 기본값은 In progress 완료시 Done
2. 삭제버튼을 눌러 특정 투두를 삭제할 수 있다.
3. Finished 버튼을 눌러 특정 투두를 완료 상태로 전환할 수 있다.
4. 완료 상태의 투두의 경우 Finished 버튼이 InProgress 버튼으로 바뀌며 해당 버튼을 눌렀을 경우 상태가 In Progress로 전환된다.
   - InProgress 버튼을 누를 경우 해당 상태로 변경된다.
5. 특정 투두의 Edit 버튼을 누를 경우 content 영역이 input으로 전환되며 내용을 수정할 수 있다.
   - 수정은 엔터를 누를경우 변경내용으로 적용된다.
   - 투두가 수정되었을 경우 작성 시간은 수정을 한 시간으로
     업데이트 된다.
   - [선택사항] input 값에 대한 예외처리 적용(최대 20자 최소 6자)
6. 투두가 많아질 경우 전체 영역이 아래로 늘어나는 것이 아닌 스크롤을 통해 확인할 수 있도록 한다.

## 코딩 컨벤션

1. 모든 컴포넌트는 OptionsAPI 형태로 작성한다.
2. 컴포넌트 파일 이름은 PascalCase로 작성한다.
   - ex) TodoList.vue, BaseInput.vue
3. template 내에서 컴포넌트 사용시 kebabCase로 작성한다.
   - ex) `<todo-list></todo-list>` `<base-input></base-input>`
