//global variable to get reference for user's specific data
var currentUser;
var myGoals;//reference to goals collection
var myTasks;

let goalID = localStorage.getItem("goalID"); //get goalID that is stored in localStorage
let taskID = localStorage.getItem("taskID"); //get taskID that is stored in localStorage

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        myGoals = currentUser.collection("goals");
        //console.log("current user: " + user.uid);
        populateGoalsDynamically();
    } else {
        console.log("no user found");
        window.location.href = "login.html";
    }
});

//display goals if user logged on
function populateGoalsDynamically() {
    let goalCardTemplate = document.getElementById("goalCardTemplate"); //card template
    let goalCardGroup = document.getElementById("goals-go-here"); //where to append card

    myGoals
        .get()
        .then(allGoals => {
            allGoals.forEach(doc => {
                var category = doc.data().category; //gets goal category
                var goal = doc.data().goal; //gets goal name
                var description = doc.data().description; //gets the description
                var date = doc.data().endDate;//gets target date
                var goalID = doc.id; //get goal ID
                //console.log("goal: " + doc.id + " is displayed")
                let goalCard = goalCardTemplate.content.cloneNode(true);

                goalCard.querySelector('#goal-category').innerHTML = "Category: " + category;
                goalCard.querySelector('#goal-title').innerHTML = "Goal: " + goal;
                goalCard.querySelector('#goal-description').innerHTML = description;
                goalCard.querySelector('#goal-date').innerHTML = date;

                //store goalID for later use to add/update task for each goal           
                goalCard.querySelector('.get-goalID').onclick = () => setGoalData(goalID);

                myTasks = myGoals.doc(goalID).collection("tasks")
                displayTasks(myTasks);//TODO:optimize it and minimalize read

                goalCardGroup.appendChild(goalCard);
            })
        })
}


//display task template, called within displayGoals
function displayTasks(myTasks) {
    let taskTemplate = document.getElementById("taskTemplate");

    myTasks.get()
        .then(snap => {
            //var i = 1;
            snap.forEach(doc => {
                var task_detail = doc.data().task_description; //get task description
                var taskID = doc.id; //get unique id for the task
                let task = taskTemplate.content.cloneNode(true);

                //update task
                task.querySelector('.task_detail').innerHTML = task_detail;
                //newTask.querySelector('.task_detail').setAttribute("id", "tdetail" + i);
                //newTask.querySelector('.task_date').setAttribute("id", "tdate" + i);

                //store taskID when clicking on a specific task
                task.querySelector('.get-taskID').onclick = () => setTaskData(taskID);

                //attach to the body
                document.getElementById("tasks-go-here").appendChild(task);
                //i++;
            })
        })
}

//store goal id
function setGoalData(id) {
    localStorage.setItem('goalID', id);
    console.log("got goalID" +id);
}

//store task id
function setTaskData(id) {
    localStorage.setItem('taskID', id);
    console.log("got taskID" +id);
}

//Add task to specific goal
function addTask(goalID) {
    console.log("addTask function is called");
    newTask = document.getElementById('newTask').value;
    
    myGoals.doc(goalID).collection("tasks")
        .add({
            task_description: newTask
            //add date later?
            //add task_done later (indicating task completion)
        })
        .then(() => {
            console.log("Task added to" + goalID);
            window.location.href = "goals.html"; //TODO: make the task list update without refreshing page
            
        })
}


//when task is checked, change the task text to strike through
function updateTaskStatus(taskID) {
    isTaskDone = document.getElementById('task_done').value;
    console.log(isTaskDone);
    //if isTaskDone (true), change text style
    //else, change it back to default
    //update task completion data if checked
    // isTaskDone.on('change', function(){
    //     if($(this).is(':checked')){
    //         $(this).attr('value','true');
    //         console.log("task checked");
    //     }else{
    //         $(this).attr('value','false');
    //         console.log("task unchecked");
    //     }
    // })
    
}

