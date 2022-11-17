//global variable to get reference for user's specific data
var currentUser;
var myGoals;
var myTasks;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        myGoals = currentUser.collection("goals");
        //console.log("current user: " + user.uid);
        populateGoalsDynamically();
    } else {
        console.log("no user logged in");
        window.location.href = "login.html";
    }
});

//display goals if user logged on
function displayGoals(myGoals) {
    let goalsTemplate = document.getElementById("goalCardTemplate");

    myGoals.get()
        .then(snap => {
            //var i = 1;
            snap.forEach(doc => {
                var title = doc.data().title;
                var description = doc.data().description;
                var date = doc.data().date;
                var goalID = doc.id;
                //get tasks that are tied to one specific goal
                myTasks = myGoals.doc(goalID).collection("tasks");
                displayTasks(myTasks);
                
                let newGoalCard = goalsTemplate.content.cloneNode(true);
                //update title, descripton, and date
                newGoalCard.querySelector('.goal_title').innerHTML = "Category: " + title;
                newGoalCard.querySelector('.goal_description').innerHTML = "Description: " + description;
                newGoalCard.querySelector('.goal_date').innerHTML = date;

                //newGoalCard.querySelector('.goal_title').setAttribute("id", "gtitle" + i);
                //newGoalCard.querySelector('.goal_description').setAttribute("id", "gdescription" + i);
                //newGoalCard.querySelector('.goal_date').setAttribute("id", "gdate" + i);
                //displayTasks(myTasks);
                //attach to the body
                document.getElementById("goals-go-here").appendChild(newGoalCard);
                //i++;
            })

            //displayTasks(myTasks);
        })

}

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
                //var date = doc.data().last_updated;//gets target date
                var goalID = doc.id; 
                console.log("goal: " + doc.id + " is displayed")
                let goalCard = goalCardTemplate.content.cloneNode(true);

                goalCard.querySelector('#goal-category').innerHTML = category;
                goalCard.querySelector('#goal-title').innerHTML = goal;
                goalCard.querySelector('#goal-description').innerHTML = description;
                //goalCard.querySelector('#goal-date').innerHTML = date;
                //goalCard.querySelector('get-goal').onclick = () => setGoalData(goalID);

                //assign add-goalID for later use to add/update task for each goal
                goalCard.querySelector('#add-task').id = 'add-' + goalID;
                // this line will call a function to save the new task to the user's document             
                //goalCard.querySelector('btn').onclick = () => addTask(goalID);
                myTasks = myGoals.doc(goalID).collection("tasks");
                displayTasks(myTasks);
               // testHikeCard.querySelector('.read-more').href = "eachHike.html?hikeName="+hikeName +"&id=" + goalID;
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
                var task_detail = doc.data().task_detail;

                let newTask = taskTemplate.content.cloneNode(true);

                //update task
                newTask.querySelector('.task_detail').innerHTML = task_detail;
                //newTask.querySelector('.task_date').innerHTML = task_date;
                //newTask.querySelector('task_status').onclick = () => setTaskData(taskID);
                //newTask.querySelector('.task_detail').setAttribute("id", "tdetail" + i);
                //newTask.querySelector('.task_date').setAttribute("id", "tdate" + i);

                //attach to the body
                document.getElementById("tasks-go-here").appendChild(newTask);
                //i++;
            })
        })
}

//store goal id
function setGoalData(id) {
    localStorage.setItem('goal-id', id);
}

//Add task
function addTask(goalID) {
    console.log("addTask function is called");
    newTask_detail = document.getElementById('newTask').value;
    //TODO: get the goal id when click, see demo  
    myTasks.add({
            task_detail: newTask_detail
            //add date later
            //add task_done later (indicating task completion)
        })
        .then(() => {
            console.log("Task successfully added!");
        })
}


//when task is checked, change the task text to strike through
function updateTaskStatus() {
    isTaskDone = document.getElementById('task_done').value;
    //if isTaskDone (true), change text style
    isTaskDone.on('change', function(){
        if($(this).is(':checked')){
            $(this).attr('value','true');
            console.log("task checked");
        }else{
            $(this).attr('value','false');
        }
    })
    //else, change it back to default
    
    //update task completion data if checked
}