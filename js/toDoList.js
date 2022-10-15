let task = document.querySelector("#task");
let ul = document.querySelector("#list");

let mList = []
let getList = window.localStorage.getItem("List");
let listSize=0;

if (getList) {
    mList = getList.split(',');
}

if (mList) {
    loadList();
}
function loadList() {    
    
    mList.forEach((e, i) => {
        if (e) {
            let li = document.createElement("li");
            let span = createBtnCancel(i);
            span.setAttribute("onClick", "clickBtnCancel(" + i + ")");
            li.innerText = e;
            li.innerHTML += span.outerHTML;
            li.id = "todo" + (i);
            li.setAttribute("onClick", "checkedTask(" + (listSize) + ")");
            ul.appendChild(li);
            listSize++;
        }
    });
}

function clickBtnCancel(i) {
    id = "#todo" + i
    let li = document.querySelector(id);
    let task = li.innerText.split('\n')[0];;
    mList=mList.filter(e=>e!=task);
    updateList();
    li.style.display = "none";
}

function createBtnCancel(id) {
    let span = document.createElement("span");
    span.classList.add("close");
    span.innerText = "X";
    span.id = id;
    return span;
}

function newElement() {
    let li = document.createElement("li");

    if (task.value.trim()) {
        mList.push(task.value);
        li.innerText = mList[mList.length-1];
        li.id = "todo" + (listSize);

        let span = createBtnCancel((listSize));
        span.setAttribute("onClick", "clickBtnCancel(" + (listSize) + ")");
        li.innerHTML += span.outerHTML;
        li.setAttribute("onClick", "checkedTask(" + (listSize) + ")");

        ul.appendChild(li);
        updateList();
        listSize++;
    } else {
        console.log("boş girilmez!");
    }
}
function checkedTask(i) {
    let li = document.querySelector("#todo" + i);
    li.classList.contains("checked")
                ? li.classList.remove("checked")
                :li.classList.add("checked");
}

function updateList(){
    window.localStorage.removeItem("List");
    window.localStorage.setItem("List",mList);
}

