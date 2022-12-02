let params = new URL(window.location.href);
let goalDoc = params.searchParams.get('id');

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        //check if it's valid url with the id in the link
        if (goalDoc != null){
            insertGoalInfo();
            populateTasks();
            showChecked();
        }else{
            window.location.href = "goals.html";
        }
        
    } else {
        console.log("no user found");
        window.location.href = "login.html";
    }
});

function insertGoalInfo(){
    currentUser.collection("goals").doc(goalDoc)
        .get()
        .then(snap=>{
            //console.log("insertGoalInfo is called");
            document.querySelector('.goal-title').innerHTML = snap.data().goal;
        })
}

function populateTasks(){
    let taskTemplate = document.getElementById("taskTemplate");
    let taskGroup = document.getElementById("task-go-here");

    // let params = new URL(window.location.href);
    // let goalDoc = params.searchParams.get('id');
    //console.log("goaldoc: " + goalDoc);

    currentUser.collection("goals").doc(goalDoc).collection("tasks")
        .get()
        .then(allTasks =>{
            allTasks.forEach(doc=>{
                var task_name = doc.data().task_description;

                let task = taskTemplate.content.cloneNode(true);
                
                task.querySelector('.task-text').innerHTML = task_name;
                
                task.querySelector('.task-checkbox').setAttribute('id', doc.id);

                taskGroup.appendChild(task);
            })

        })
};

/*
clicking on the confirm button when creating a new subgoal will add the 
input to subcollecton tasks
*/
document.querySelector("#task-confirm").addEventListener("click", ()=>{
    // let params = new URL(window.location.href);
    // let goalDoc = params.searchParams.get('id');

    subgoal = document.getElementById('new-task').value;
    
    currentUser.collection("goals").doc(goalDoc).collection("tasks")
        .add({
            task_description: subgoal
        })
        .then(() => {
            console.log("Task added to" + goalDoc);
            window.location.href = params; 
        })
});

//return the checkbox.checked
function checkboxListen(checkboxBoolean, taskDoc){
    //console.log(taskDoc +" with " +checkboxBoolean);
    currentUser.collection("goals").doc(goalDoc).collection("tasks").doc(taskDoc)
        .set({
            taskDone: checkboxBoolean
        },{merge:true})
    
}

function showChecked(){
    currentUser.collection("goals").doc(goalDoc).collection("tasks")
        .where("taskDone","==", true)
        .get()
        .then(snap=> {
            queryData = snap.docs;
            //console.log(queryData);
            queryData.forEach(doc=>{
                checkboxStatus = doc.data().taskDone
                document.getElementById(doc.id).checked = checkboxStatus;
            })
        });
}

document.querySelector('a').href = "GoalLog.html?id="+ goalDoc;


