const Type = {
    Todo: 1,
    Done: 2,
  };
let classes = [];
let notes = [];

let addClassBtn = document.querySelector("#addClass");
addClassBtn.addEventListener("click", addTable);

function addTable (){
    // 1. read input
    let _title = document.querySelector("#newClassTitle");
    let _day = document.querySelector("#newClassDay");
    let _sHour = document.querySelector("#StartHour");
    let _sMinute = document.querySelector("#StartMinute");
    let _eHour = document.querySelector("#EndHour");
    let _eMinute = document.querySelector("#EndMinute");

    let title = _title.value;
    let day = _day.value;
    let sHour = _sHour.value;
    let sMinute = _sMinute.value;
    let eHour = _eHour.value;
    let eMinute = _eMinute.value;

    // 2. create class object
    let _class = {
        title: title,
        day: day,
        sHour: Number(sHour),
        sMinute: Number(sMinute),
        eHour: Number(eHour),
        eMinute: Number(eMinute)
    };

    console.log(_class);
    // 2.5 exception handling
    if (!valid_check(_class))
    return;

    // 3. Append to class list
    classes.push(_class);
    saveClasses();

    // 4. Create new class item and attach it to time-table
    addToTable(_class);

    // 5. Clear the input
    _title.value = "";
    _day.value = "월";
    _sHour.value = "9";
    _sMinute.value = "00";
    _eHour.value = "10";
    _eMinute.value = "15";
}

function valid_check(_class){
    if(_class.title.length == 0){
        alert("과목명을 입력해주세요.");
        return false;
    } 
    if(_class.sHour < 9 || _class.sHour > 21 || _class.sMinute < 0 || _class.sMinute > 59 || _class.eHour < 9 || _class.eHour > 22 || _class.eMinute < 0 || _class.eMinute > 59){
        alert("적당한 시간을 입력해 주세요.");
        return false;
    }
    if(_class.eHour == 22 && _class.eMinute != 0){
        alert("종료시간은 22시 00분까지만 입력 가능합니다.");
        return false;
    }

    _classStart = _class.sHour * 60 + _class.sMinute;
    _classEnd = _class.eHour * 60 + _class.eMinute;
    if(_classStart >= _classEnd){
        alert("시작시간은 종료시간보다 빨라야 합니다.");
        return false;
    } 

    for(var i in classes){
        if(classes[i].day === _class.day){
            iStart = classes[i].sHour * 60 + classes[i].sMinute;
            iEnd = classes[i].eHour * 60 + classes[i].eMinute;
            console.log(iStart);
            console.log(iEnd);
            console.log(_classStart);
            if(iStart <= _classStart && _classStart < iEnd){
                alert("다른 수업과 시간이 겹칩니다.");
                return false;
            }
            if(iStart < _classEnd && _classEnd <= iEnd){
                alert("다른 수업과 시간이 겹칩니다.");
                return false;
            }
            if(iStart > _classStart && iEnd < _classEnd){
                alert("다른 수업과 시간이 겹칩니다.");
                return false;
            }
        }
    }
    return true;
}
function saveClasses() {
    localStorage.setItem("classes", JSON.stringify(classes));
}
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}
window.addEventListener("load", () => {
  loadClasses();
  loadNotes();
});
function loadClasses() {
    let lastClasses = localStorage.getItem("classes");
    if (!lastClasses) return;
    classes = JSON.parse(lastClasses);
    classes.forEach(t => {
        addToTable(t);
    });
}
function loadNotes() {
    let lastNotes = localStorage.getItem("notes");
    if (!lastNotes) return;
    notes = JSON.parse(lastNotes);
    notes.forEach(t => {
        addToNote(t);
    });
}

function addToTable(_class){
    let div = document.createElement("div");
    div.className = "subject color1 d-flex align-items-center";

    _classStart = _class.sHour * 60 + _class.sMinute;
    _classEnd = _class.eHour * 60 + _class.eMinute;
    _classHeight = _classEnd - _classStart + 1;
    _classTop = _classStart - 540;

    div.style.setProperty('position', 'absolute');
    div.style.setProperty('top', _classTop + 'px');
    div.style.setProperty('height', _classHeight + 'px');

    // TO-do : 내부 구성요소 추가 & 삭제버튼 구현
    let span = document.createElement("span");
    span.className = "me-auto mb-auto ms-2 mt-2";

    span.textContent = _class.title;
    div.appendChild(span);

    let buttonRemove = document.createElement("button");
    buttonRemove.className = "btn btn-sm mb-auto";
    buttonRemove.style.setProperty('display', 'none');
    buttonRemove.innerHTML = '<i class="bi bi-trash"></i>';
    div.appendChild(buttonRemove);
    buttonRemove.addEventListener("click", () => {
        div.remove();
        classes = classes.filter(t => t !== _class);
        saveClasses();
    });

    div.addEventListener("mouseover", () => {
        buttonRemove.style.setProperty('display', 'block');
    })
    div.addEventListener("mouseout", () => {
        buttonRemove.style.setProperty('display', 'none');
    })

    // 시간표 화면에 추가
    let col = document.querySelector("#"+_class.day);
    col.appendChild(div);
}

function addToNote(memo){
    let ToDoList = document.getElementById('noteList'); 
    let div = document.createElement('div');
    div.className = "d-flex align-items-center";
    let checkBtn = document.createElement("button");
    checkBtn.className = "btn";
    if(memo.type == Type.Todo)
        checkBtn.innerHTML = '<i class="bi bi-check-circle"></i>';
    if(memo.type == Type.Done)
        checkBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
    div.appendChild(checkBtn);

    let span = document.createElement("span");
    span.className = "me-auto";
    span.textContent = memo.text;
    div.appendChild(span);

    let buttonRemove = document.createElement("button");
    buttonRemove.className = "btn btn-sm btn-danger ms-auto";
    buttonRemove.style.setProperty('display', 'none');
    buttonRemove.innerHTML = '<i class="bi bi-x"></i>';
    div.appendChild(buttonRemove);

    checkBtn.addEventListener("click", function(){
        if(memo.type === Type.Todo){
            memo.type = Type.Done;
        }
        else{
            memo.type = Type.Todo;
        }
        let index = notes.indexOf(memo);
        notes[index] = memo;
        
        refreshNotes();
        saveNotes();
    })

    buttonRemove.addEventListener("click", function(){
        div.remove();
        notes = notes.filter(t => t !== memo);
        saveNotes();
    })
    div.addEventListener("mouseover", () => {
        buttonRemove.style.setProperty('display', 'block');
    })
    div.addEventListener("mouseout", () => {
        buttonRemove.style.setProperty('display', 'none');
    })


    ToDoList.appendChild(div);
}

let addButton = document.getElementById('NoteAddButton');
addButton.addEventListener('click', addNote);

function addNote(){
    let inputBox = document.getElementById('noteInput');
    let text = inputBox.value;
    if(!text.length) return;

    let memo = {
        text: text,
        type: Type.Todo
    };

    notes.push(memo);
    saveNotes();

    addToNote(memo);
    inputBox.value = "";
}

function refreshNotes(){
    let ToDoList = document.getElementById('noteList'); 
    while(ToDoList.hasChildNodes())
        ToDoList.removeChild(ToDoList.firstChild);

    notes.forEach(t => {
        addToNote(t);
    });
}

let inputBox = document.getElementById('noteInput');
inputBox.addEventListener("keyup", (e)=>{
      if(e.keyCode == 13)
          addNote();
});