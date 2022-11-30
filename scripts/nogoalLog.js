let params = new URL(window.location.href);
let goalDoc = params.searchParams.get('id');

var currentuser;
var logspace = currentUser.collection("goals").doc(goalDoc).collection("Goal_Logs")


// const querySnapshot = await admin.firestore().collection('users').doc('user.uid').collection('goals')
//       doc(goaldoc).collection(Goal_Logs).limit(1).get()
//        if (querySnapshot.empty) {console.log('sub-collection not existing')}
//from each goal, checks that the goaldoc is not empty
//I wan to us the if statement to fill in the "nothing here yet message/div"


firebase.auth().onAuthStateChanged(user => {
  if (user) {
      currentUser = db.collection("users").doc(user.uid);
      //console.log("current user: " + user.uid);

      //checks to see if the log collection exists
      currentuser.collection('goal').doc(goaldoc).get().then(
        doc => {
          if (doc.exists) {
            currentuser.collection('goals').doc(goaldoc).collection('Goal_Logs').limit(1).get().
              then(sub => {
                if (sub.docs.length > 0) {
                  console.log('usernames subcollection exists!');

                  //shows the logs
                  populateLogsDynamically()

                  //hides nologs message
                  var x = document.getElementById("no-logs");
                  x.style.display = "none";
                }else{

                  //hides yes-log display
                  var y = getElementById(yes-logs);
                  y.style.display = "none";

                 
                }
              });
            }
        });
      
  } else {
      console.log("no user found");
      window.location.href = "login.html";
  }
});







//other than calling this LOgs instead of goals, this is mostly unchanged, this populates a space if there is a log
//it is from on dof the demos


function populateLogsDynamically() {
  let goalCardTemplate = document.getElementById("goalCardTemplate"); //card template
  let goalCardGroup = document.getElementById("goals-go-here"); //where to append card

  currentUser.collection("goals").doc(goalDoc).collection("Goal_Logs")
  
      .get()
      .then(allLogs => {
          allLogs.forEach(doc => {
              var description = doc.data().task_description; //gets the description
              var time = doc.data().time;//gets target date
              //console.log("goal: " + doc.id + " is displayed")

              let goalCard = goalCardTemplate.content.cloneNode(true);

              // goalCard.querySelector('.goal-title').innerHTML = goal;
              // goalCard.querySelector('.goal-category').innerHTML = category;
              goalCard.querySelector('.goal-description').innerHTML = description;
              goalCard.querySelector('.goal-date').innerHTML = time;

              //pass goal doc id with url
              // goalCard.querySelector('a').href = "eachGoal.html?id="+ doc.id;
        
              goalCardGroup.appendChild(goalCard);
          })
      })
}

//This is the function that creates the goal log
function startLog() {
  console.log("making new Goal Log")
  //send us to the next page, what should that be here?? maybe the goal list page
    window.location.href = "newLog.html?id="+ goalDoc;
}






