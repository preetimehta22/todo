var taskList = new Array;

window.onload = function(){
    getTaskList();
}

function getTaskList() {
    var todoList = window.localStorage.getItem('todo');
    if (todoList != null) {
        taskList = JSON.parse(todoList); 
    }
     showTaskList();
}

function newTask() {
    var task = document.getElementById('task').value;
    taskList.push(task);
    localStorage.setItem('todo',JSON.stringify(taskList));
    showTaskList();
    document.getElementById('task').value = '';
}

function deleteTask(j) {
    taskList.splice(j, 1);
    window.localStorage.setItem('todo', JSON.stringify(taskList));
    showTaskList();
}

function completeTask(j) {
    taskList[j] = "!taskCompleted"+taskList[j];
    window.localStorage.setItem('todo', JSON.stringify(taskList));
    showTaskList();
}

function showTaskList() {
    var list = '<ul>#task#</ul>';
    var htmlToShow = '';
    if (taskList.length > 0){
        for(var i=0; i<taskList.length; i++) {
            if (taskList[i].includes("!taskCompleted")){
                htmlToShow += '<li tooltip="Completed"><button class="completed" style="background: green;"><i class="fa fa-check"></i></button><p class="task-list">' + taskList[i].replace("!taskCompleted","") + '</p><button class="delete" onclick="deleteTask('+i+')">x</button></li>';
            }
        else{
            htmlToShow += '<li><button class="complete" onclick="completeTask('+i+')"></button><p class="task-list">' + taskList[i] + '</p><button class="delete" onclick="deleteTask('+i+')">x</button></li>';
        }
    };
    list = list.replace("#task#", htmlToShow);
    }
    else {
        list = list.replace("#task#", "No Tasks yet.");
    }
    document.getElementById('todoList').innerHTML = list;
}
document.getElementById("task").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    newTask();
  }
});