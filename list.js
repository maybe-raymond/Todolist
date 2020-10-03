let all_projects =["Inbox", "Today", "Tommorrow"];

let all_tasks = [];


const list = (title, priorty, dueDate=[month, date, year], project) => {
  return {title, dueDate, priorty, project}
}

let current_project = "inbox"

function add_project(){
  let projects = document.querySelector("#tasks");
  for (let i of all_projects ) {
    li = document.createElement("li");
    li.innerHTML = i;
    tasks.append(li);
  }
}

function add_project_form(){
  let button = document.querySelector("#project-add");
  let form = document.querySelector(".project-create");
  button.addEventListener("click", () => {
    form.style.display = "block"
  })
}

function add_project_nav(){
  let nav =document.querySelector("#project");
  let form = document.querySelector(".project-create");
  let form_input = form.querySelector("input");
  let form_button = form.querySelector("button");
  form_button.addEventListener("click", ()=>{
      li = document.createElement("li");
      li.innerHTML = form_input.value;
      nav.append(li);
      form.style.display = "none"
      makeThisProjecEvent(li)
  })
}

function add_task(){
  let button = document.querySelector(".butt-todo");
  let form = document.querySelector(".task-create");
  button.addEventListener("click", () => {
    form.style.display="block"
  })
}

function make_task(){
  let form = document.querySelector(".task-create");
  let button = form.querySelector("button");
  let task = form.querySelector("input");
  let date = form.querySelector("#date");
  let priority = form.querySelector("#priorty");
  button.addEventListener("click" , () =>{
    let array_date = date.value.split("-")
    let todo = list(task.value, priority.value, array_date, getProjectName());
    all_tasks.push(todo)
    form.style.display= "none";
    destroy_list()
    put_content(getProjectName())
  })
}

function destroy_list(){
    let main = document.querySelector(".all-todos");
    while ( main.lastElementChild ){
      main.removeChild(main.lastElementChild)
    }

}

function make_list(){
  let main = document.querySelector(".all-todos");
  for (let i of all_tasks){
    let div = document.createElement("div");
    let label = document.createElement("label");
    let input = document.createElement("input");
    label.innerHTML = i.title
    div.classList.add("todo");
    input.type = "checkbox";
    main.appendChild(div);
    div.appendChild(input);
    div.appendChild(label);
  }
  add_check_events()
}

function make_list2(i){
  let main = document.querySelector(".all-todos");
  let div = document.createElement("div");
  let label = document.createElement("label");
  let input = document.createElement("input");
  label.innerHTML = i.title
  div.classList.add("todo");
  input.type = "checkbox";
  main.appendChild(div);
  div.appendChild(input);
  div.appendChild(label);
}

function add_check_events(){
  let todo = document.querySelectorAll(".todo");
  todo.forEach( (i) => {
    let index = 0
    check = i.querySelector("input");
    check.addEventListener("change", () => {
        i.remove()
        all_tasks.pop(index)
      }
    )
  index++}
  )}

function startup(i){
  let main = document.querySelector(".main-content");
  h2 = main.querySelector("h2");
  h2.innerHTML = i;
  let current_project = i
}

function put_content(b){
    for (let i of all_tasks){
      if (b === "Inbox"){
        make_list2(i)
      }
    else if (b === "Today"  &&  checkToday(i.dueDate)){
      make_list2(i)
    }
    else if (b === "Tommorrow"  &&  checktommorrow(i.dueDate)){
      make_list2(i)
  }
  else if (i.project === b){
    make_list2(i)
    }
  }add_check_events()
}

function checkToday(i){
  let [month, date, year]=( new Date()).toLocaleDateString().split("/")
  if ( i[0] === year ){
    console.log("year done")
    if( i[2] ===  date ){
      if( Number(i[1]) === Number(month) ){
        return true
      }
    }
  }
}

function checktommorrow(i){
  const today = new Date()
  const tomorrow = new Date(today)
  let p = tomorrow.setDate(tomorrow.getDate() + 1)
  tomorr = (new Date(p)).toLocaleDateString().split("/")
  if (i[0] === tomorr[2] ){
    if( i[2] === tomorr[1] ){
      if( Number(i[1]) === Number(tomorr[0]) ){
        return true
      }
    }
  }
}

function li_project_event(){
  projects = document.querySelectorAll("li");
  projects.forEach( (i) => {
    i.addEventListener("click", () => {
      startup(i.innerHTML)
      destroy_list();
      put_content(i.innerHTML)

    })
  } )
}

function makeThisProjecEvent(i){
  i.addEventListener("click", () => {
    startup(i.innerHTML)
    destroy_list();
    put_content(i.innerHTML)
  })
}

function getProjectName(){
  let main = document.querySelector(".main-content");
  h2 = main.querySelector("h2");
  if (h2.innerHTML !== "Inbox"||  h2.innerHTML !== "Today"|| h2.innerHTML !== "Tommorrow" ){
      return h2.innerHTML
  }

}


function init(){
  startup(all_projects[0])
  add_project()
  add_project_form()
  add_project_nav()
  add_task()
  make_task()
  li_project_event()
}

init()
