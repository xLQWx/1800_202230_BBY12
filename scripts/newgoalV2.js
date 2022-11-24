var currentUser;
var myGoals;
var dropVal;

console.log("Something was loaded");

firebase.auth().onAuthStateChanged(user => {
    currentUser =db.collection("users").doc(user.uid);
    myGoals = currentUser.collection("goals");
});


function writeGoalsTest() {

  myGoals.add({
      category: "Fitness",
      goal: "To swim a 5k race",
      description: "To improve my swimming to the point where I can compete for the first time in a race in 3 months",
      last_updated: firebase.firestore.FieldValue.serverTimestamp()

    });
}




function saveGoal() {
    console.log("inside saveGoal")

  //if any fields are empty: create an an error popup


    let goalCategory = dropVal;
    let goalName = document.getElementById('goal-name').value;
    let gDescription = document.getElementById('goal-description').value;
    let goalTarget = document.getElementById("goal-endate").value;

    console.log(goalCategory, goalName, gDescription, goalTarget);



    myGoals.add({
      category: goalCategory,
      goal: goalName,
      description: gDescription,
      endDate: goalTarget,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()

      
   
    }).then(()=>{

    //send us to the next page, what should that be here?? maybe the goal list page
      window.location.href = "goals.html";
  });
}

//////////////////////////////////////////////////////

//Playing with getting ID's from collections

function printUserIDS() {
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    console.log(doc.id);
    });
  });
}



 function printGoalIDS() {
   db.collection("users")
     .get()
     .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
         db.collection("users")
           .doc(doc.id)
           .collection("goals")
           .get()
           .then((querySnapshot) => {
             querySnapshot.forEach((thing) => {
               console.log(thing.id);
             });
           });
       });
     });
 }





//this is for the dropdown button

  function dropdownListener() {
    $('#goal-categories li').on('click', function () {
       $('#dropdownMenuButton').text($(this).text());
       console.log($(this).text());
       dropVal = $(this).text();
    });
}
dropdownListener();

