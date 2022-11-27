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


//Harrison's stuff
// let logAnchor = document.getElementById("logAnchor");
  
// logAnchor.querySelector('a').href = "GoalLog.html?id="+ doc.id;


// function startLogging(){
//     let logAnchor = document.getElementById("logAnchor");
  
//     logAnchor.querySelector('a').href = "eachGoal.html?id="+ doc.id;

// }

document.querySelector('a').href = "GoalLog.html?id="+ goalDoc;


// function populateGoalsDynamically() {
//     let goalCardTemplate = document.getElementById("goalCardTemplate"); //card template
//     let goalCardGroup = document.getElementById("goals-go-here"); //where to append card

//     currentUser.collection("goals")
    
//         .get()
//         .then(allGoals => {
//             allGoals.forEach(doc => {
//                 var category = doc.data().category; //gets goal category
//                 var goal = doc.data().goal; //gets goal name
//                 var description = doc.data().description; //gets the description
//                 var date = doc.data().endDate;//gets target date
//                 //console.log("goal: " + doc.id + " is displayed")

//                 let goalCard = goalCardTemplate.content.cloneNode(true);

//                 goalCard.querySelector('.goal-title').innerHTML = goal;
//                 goalCard.querySelector('.goal-category').innerHTML = category;
//                 goalCard.querySelector('.goal-description').innerHTML = description;
//                 goalCard.querySelector('.goal-date').innerHTML = date;

//                 //pass goal doc id with url
//                 goalCard.querySelector('a').href = "eachGoal.html?id="+ goalDoc;
          
//                 goalCardGroup.appendChild(goalCard);
//             })
//         })
// }

