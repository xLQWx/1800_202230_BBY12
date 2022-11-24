firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        
        populateTasks();
    } else {
        console.log("no user found");
        window.location.href = "login.html";
    }
});

function populateTasks(){
    let taskTemplate = document.getElementById("taskTemplate");
    let taskGroup = document.getElementById("task-go-here");

    let params = new URL(window.location.href);
    let goalDoc = params.searchParams.get('id');
    //console.log("goaldoc: " + goalDoc);
    currentUser.collection("goals").doc(goalDoc).collection("tasks")
        .get()
        .then(allTasks =>{
            allTasks.forEach(doc=>{
                var task_name = doc.data().task_description;

                let task = taskTemplate.content.cloneNode(true);
                
                task.querySelector('.task-text').innerHTML = task_name;
                task.querySelector('.task-checkbox').onclick=()=>updateTaskStatus(doc.id);

                taskGroup.appendChild(task);
            })

        })
};

/*
clicking on the confirm button when creating a new subgoal will add the 
input to subcollecton tasks
*/
document.querySelector("#task-confirm").addEventListener("click", ()=>{
    let params = new URL(window.location.href);
    let goalDoc = params.searchParams.get('id');

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

function updateTaskStatus(TaskID){
    //if checkbox is checked, 
    console.log("Task in" + TaskID);
};

