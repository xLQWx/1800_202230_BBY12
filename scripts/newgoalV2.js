var currentUser;

console.log("Something was loaded");

firebase.auth().onAuthStateChanged(user => {
    currentUser =db.collection("users").doc(user.uid);
    myGoals = db.collection("users").doc(user.uid).collection("goals");
});






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


  //userdoc holds user data now
//   currentUser.get().then(userDoc =>{
//     var goals = userDoc.data().goals;
//     console.log(goals);
// }) 
// getGoals();

//   db.collection("users").doc(user.uid).collection()
// }

function writeGoals() {

    myGoals.add({
        Category: "Fitness",
        Goal: "To swim a 5k race",
        Description: "To improve my swimming to the point where I can compete for the first time in a race in 3 months",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
 
      });
  }


// function returnGoalInfo(){
//   console.log(myGoals);
// }
// returnGoalInfo();


//this is for the dropdown button

  function dropdownListener() {
    $('#goal-categories li').on('click', function () {
       $('#dropdownMenuButton').text($(this).text());
       console.log($(this).text());
    });
}
dropdownListener();


//Arron's code for something he did, I want to stop the user from moving onwards without selecting a goal category
//otherwise, I can set it to misc. if I can't figure it out
// app.get("/", function (req, res) {

//   //logged in or not, if not logged in, sned user back to login page
//   if (req.session.loggedIn) {
//       res.redirect("/profile");
//   } else {

//       let doc = fs.readFileSync("./app/html/index.html", "utf8");

//       res.set("Server", "Wazubi Engine");
//       res.set("X-Powered-By", "Wazubi");
//       res.send(doc);
//   }
// });






//this cannot work because there is no varible for the goal in the goal.uid section, I need to find the goal id then 
//put it in there

//   firebase.auth().onAuthStateChanged(user => {
//     mySubGoals = db.collection("users").doc(user.uid).collection("goals").doc(goal.uid).collection("subgoals");
// });




  //Lab 10 content



//   function getHike() {
//     hikeID = localStorage.getItem("hikeID");
    
    
//     //uses .where instead of .get, beacues we only want where code is associated with "Buncen Lake hike"
//     db.collection("hikes").where("code", "==", hikeID)
//                 .get()
//                 .then(queryHike => {
//                     //see how many results you have got from the query
//                     size = queryHike.size;
//                     // get the documents of query
//                     Hikes = queryHike.docs;
    
//                     // We want to have one document per hike, so if the the result of 
//                     //the query is more than one, we can check it right now and clean the DB if needed.
//                     if (size = 1) {
//                         var thisHike = Hikes[0].data();
//                         var name = thisHike.name;
//                         document.getElementById("HikeName").innerHTML = name;
//                     } else {
//                         console.log("Query has more than one data")
//                     }
//                 })
//                 .catch((error) => {
//                     console.log("Error getting documents: ", error);
//                 });
//             }
    
//     getHike();
    
//                 function writeReview() {
//                     console.log("in")
//                     let Title = document.getElementById("title").value;
//                     let Level = document.getElementById("level").value;
//                     let Season = document.getElementById("season").value;
//                     let Description = document.getElementById("description").value;
//                     let Flooded = document.querySelector('input[name="flooded"]:checked').value;
//                     let Scrambled = document.querySelector('input[name="scrambled"]:checked').value;
//                     console.log(Title, Level, Season, Description, Flooded, Scrambled);
                
//                     firebase.auth().onAuthStateChanged(user => {
//                         if (user) {
//                             var currentUser = db.collection("users").doc(user.uid)
//                             var userID = user.uid;
//                             //get the document for current user.
//                             currentUser.get()
//                                 .then(userDoc => {
//                                     var userEmail = userDoc.data().email;
//                                     db.collection("Reviews").add({
//                                         code: hikeID,
//                                         userID: userID,
//                                         title: Title,
//                                         level: Level,
//                                         season: Season,
//                                         description: Description,
//                                         flooded: Flooded,
//                                         scrambled: Scrambled,
//                                         timestamp: firebase.firestore.FieldValue.serverTimestamp()
//                                     }).then(()=>{
//                                         window.location.href = "thanks.html"; //new line added
//                                     })
//                                 })
                                   
//                         } else {
//                             // No user is signed in.
//                         }
//                     });
                
//                 }