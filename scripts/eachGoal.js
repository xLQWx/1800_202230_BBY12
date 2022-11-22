//var goalID = localStorage.getItem("goalID");

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
                
                task.querySelector('.task_detail').innerHTML = task_name;

                taskGroup.appendChild(task);
            })

        })
}