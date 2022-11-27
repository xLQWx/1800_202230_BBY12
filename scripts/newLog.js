let params = new URL(window.location.href);
let goalDoc = params.searchParams.get('id');

var currentUser;
var myGoals;
var dropVal;

console.log("Something was loaded");

firebase.auth().onAuthStateChanged(user => {
    currentUser =db.collection("users").doc(user.uid);
    myGoals = currentUser.collection("goals");
});


document.querySelector("#Confirm").addEventListener("click", ()=>{

  log = document.getElementById('log-entry').value;
  
  currentUser.collection("goals").doc(goalDoc).collection("Goal_Logs")
      .add({
          task_description: log,
          time: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
          console.log("Log added for" + goalDoc);
          window.location.href ="GoalLog.html?id="+ goalDoc; 
      })
});




//I should check that the input field is not null first
function saveLog() {
    console.log("inside saveLog")

  //if any fields are empty: create an an error popup

    let log = document.getElementById('log-entry').value;
    console.log(log);


//find where goalDoc is!!!!
    myGoals.doc(goalDoc).collection(logs).add({
      Log: goalCategory,
      Time: firebase.firestore.FieldValue.serverTimestamp()

    }).then(()=>{

    //send us to the goal-log display page
      window.location.href = "goal-log.html";
  });
}







