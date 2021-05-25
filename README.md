# Weekly-Schedule-Widget
Shows weekly schedule time table on your desktop

-------------------------------------------------------------------------------------------------------------------------------------

모바일에서 에브리타임과 같은 수업 시간표 어플은 있지만, 데스크 탑에서는 그러한 앱이 없다.
사람들은 보통 데스크탑에서 Skicky note와 같은 메모장 앱을 많이 사용하는데, 수업 시간표를 한눈에 보여주는 웹앱이 있다면 굉장히 편리할 것이라 생각해서 개발하게 되었다. 
html, css, javascript 로 구현하였으며, 사용자가 입력한 데이터는 local storage에 저장된다.
기능으로는 수업추가 및 삭제, 메모 추가, 메모 체크, 메모 삭제 등이 있다. 

-------------------------------------------------------------------------------------------------------------------------------------

### Installation

1. [Releases](https://github.com/kris6613123/Weekly-Schedule-Widget/releases) 접속

2. 아래의 그림과 같이 버전 최신버전의 설치파일 weekly-schedule-widget-main-Setup-*.exe 을 다운로드

3. 다운로드된 파일을 열어 설치 후 실행 

![image](https://user-images.githubusercontent.com/54178500/119499701-eee06600-bda1-11eb-9145-0872cbfb68e2.png)

-------------------------------------------------------------------------------------------------------------------------------------

### How To Use

1. class add 
  + 수업이름과 요일, 시간을 입력하고 add를 누르면 화면에 해당 수업 표시

2. class delete
  + 지우고 싶은 수업에 있는 휴지통 아이콘을 클릭하면 삭제

3. note add
  + 할일 또는 간단한 수업 내용을 기입하고 추가표시 버튼을 클릭하거나 키보드 엔터버튼을 누르면 노트추가 

4. note check
  + 완료한 일 좌측에 체크 버튼을 누르면 해당 메모 체크 표시, 다시 누르면 체크 해제

5. note delete
  + 지우고 싶은 메모 우측에 있는 삭제 버튼을 누르면 해당 메모 삭제 

-------------------------------------------------------------------------------------------------------------------------------------
 
### Example 



### Screenshot of our App
![프로젝트 캡처](https://user-images.githubusercontent.com/54178500/119458342-9b592280-bd77-11eb-9231-a755f39edd8f.PNG)

-------------------------------------------------------------------------------------------------------------------------------------

### Build
Weekly-Schedule-Widget은 [Electron](https://electronjs.org/)을 기반으로 UI는 [bootstrap](https://getbootstrap.com/)을 사용하여 작성되었습니다. GitHub Repository에 새로운 tag가 추가되면 자동으로 빌드하는 action이 [.github/workflows/main.yml](https://github.com/kris6613123/Weekly-Schedule-Widget/blob/main/.github/workflows/main.yml)에 있어 tag 추가시 별도의 작업 없이 자동으로 빌드됩니다.

직접 빌드해서 Portable 버전으로 사용하시려면 아래와 같이 진행하십시오.
1. electron-forge설치
```
$ npm install --save-dev @electron-forge/cli
$ npx electron-forge import
```
2. Electron-forge 빌드
```
$ npm run make
```
3. 실행파일 위치
```
.\out\weekly-schedule-widget-main-win32-x64\weekly-schedule-widget-main.exe
```

-------------------------------------------------------------------------------------------------------------------------------------

### Demo

https://youtu.be/agBcHxzbQdw

-------------------------------------------------------------------------------------------------------------------------------------

### License
Licensed under the MIT license.

