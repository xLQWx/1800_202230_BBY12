//global variable to get reference for user's specific data
var currentUser;
var myGoals;
var myTasks;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        myGoals = currentUser.collection("goals");
        myTasks = myGoals.doc("rJYWpM3heFhF8Osx534L").collection("tasks");
        //console.log("current user: " + user.uid);
        displayGoals(myGoals);
    } else {
        console.log("no user logged in");
        window.location.href = "login.html";
    }
});

//display goals if user signed in
function displayGoals(myGoals) {
    let goalsTemplate = document.getElementById("goalCardTemplate");

    myGoals.get()
        .then(snap => {
            //var i = 1;
            snap.forEach(doc => {
                var title = doc.data().title;
                var description = doc.data().description;
                var date = doc.data().date;

                let newGoalCard = goalsTemplate.content.cloneNode(true);

                //update title, descripton, and date
                newGoalCard.querySelector('.goal_title').innerHTML = "Category: " + title;
                newGoalCard.querySelector('.goal_description').innerHTML = "Description: " + description;
                newGoalCard.querySelector('.goal_date').innerHTML = date;

                //newGoalCard.querySelector('.goal_title').setAttribute("id", "gtitle" + i);
                //newGoalCard.querySelector('.goal_description').setAttribute("id", "gdescription" + i);
                //newGoalCard.querySelector('.goal_date').setAttribute("id", "gdate" + i);

                //attach to the body
                document.getElementById("goals-go-here").appendChild(newGoalCard);
                //i++;
            })

            displayTasks(myTasks);
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

//Add task
function addTask() {
    newTask_detail = document.getElementById('newTask').value;

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

