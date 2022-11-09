//writing data to firestore manually, remove later
function writeGoals() {
    max = 10;

    const days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(); //current time
    let day = days[d.getDay()];
    let time = d.getTime();
    
    var goalsRef = db.collection("goals"); //need to change this later
    for (i = 1; i <= max; i++) {
        goalsRef.add({
            title: "goal" + i,
            description: "a summary for a goal" + i,
            date: day
        })
    }

    var tasksRef = db.collection("tasks"); //need to change this later
    for (i = 1; i <= 2; i++) {
        tasksRef.add({
            task_detail: "task" + i,
            task_date: time
        })
    }

}

function displayGoals(collection) {
    let goalsTemplate = document.getElementById("goalCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => {
                var title = doc.data().title;
                var description = doc.data().description;
                var date = doc.data().date;

                let newGoalCard = goalsTemplate.content.cloneNode(true);

                //update title, descripton, and date
                newGoalCard.querySelector('.goal_title').innerHTML = "Category: "+title;
                newGoalCard.querySelector('.goal_description').innerHTML = "Description: "+description;
                newGoalCard.querySelector('.goal_date').innerHTML = date;

                newGoalCard.querySelector('.goal_title').setAttribute("id", "gtitle" + i);
                newGoalCard.querySelector('.goal_description').setAttribute("id", "gdescription" + i);
                newGoalCard.querySelector('.goal_date').setAttribute("id", "gdate" + i);

                //attach to the body
                document.getElementById(collection + "-go-here").appendChild(newGoalCard);
                i++;
            })
        })
}
displayGoals("goals");

function displayTasks(collection) {
    let taskTemplate = document.getElementById("taskTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => {
                var task_detail = doc.data().task_detail;
                var task_date = doc.data().task_date;

                let newTask = taskTemplate.content.cloneNode(true);

                //update task
                newTask.querySelector('.task_detail').innerHTML = task_detail;
                newTask.querySelector('.task_date').innerHTML = task_date;

                newTask.querySelector('.task_detail').setAttribute("id", "tdetail" + i);
                newTask.querySelector('.task_date').setAttribute("id", "tdate" + i);

                //attach to the body
                document.getElementById(collection + "-go-here").appendChild(newTask);
                i++;
            })
        })
}
displayGoals("tasks");