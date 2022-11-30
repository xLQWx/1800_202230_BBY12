let params = new URL(window.location.href);
let goalDoc = params.searchParams.get('id');

var currentuser;
// var logspace = currentUser.collection("goals").doc(goalDoc).collection("Goal_Logs")

//from each goal, checks that the goaldoc is not empty
//I wan to us the if statement to fill in the "nothing here yet message/div"


firebase.auth().onAuthStateChanged(user => {
  if (user) {
      currentUser = db.collection("users").doc(user.uid);
      //console.log("current user: " + user.uid);
      
      populateLogsDynamically();
  } else {
      console.log("no user found");
      window.location.href = "login.html";
  }
});



//other than calling this LOgs instead of goals, this is mostly unchanged, this populates a space if there is a log
//it is from on dof the demos


function populateLogsDynamically() {
  let logCardTemplate = document.getElementById("logCardTemplate"); //card template
  let logCardGroup = document.getElementById("logs-go-here"); //where to append card

  currentUser.collection("goals").doc(goalDoc).collection("Goal_Logs")
  
      .get()
      .then(allLogs => {
          allLogs.forEach(doc => {


            
              var description = doc.data().task_description; //gets the description

//handling the date
let fireStoreTimestamp = doc.data().time;
let javascriptDate = fireStoreTimestamp.toDate();

var time = javascriptDate;
              // var time = doc.data().time;//gets target date
              //console.log("goal: " + doc.id + " is displayed")

              let logCard = logCardTemplate.content.cloneNode(true);

              // goalCard.querySelector('.goal-title').innerHTML = goal;
              // goalCard.querySelector('.goal-category').innerHTML = category;
              logCard.querySelector('.log-description').innerHTML = description;
              logCard.querySelector('.log-date').innerHTML = time;

              //pass goal doc id with url
              // goalCard.querySelector('a').href = "eachGoal.html?id="+ doc.id;
        console.log('This has worked to this point');
              logCardGroup.appendChild(logCard);
          })
      })
}

//This is the function that creates the goal log
function startLog() {
  console.log("making new Goal Log")
  //send us to the next page, what should that be here?? maybe the goal list page
    window.location.href = "newLog.html?id="+ goalDoc;
}






