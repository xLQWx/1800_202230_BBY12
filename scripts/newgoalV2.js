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


// currentGoal = currentUser.collection("goals").doc();







//////////////////////////////////////////////////////////////////////////////////////////////////////////
//recreating making a variable for goalID, then use it later
// function populateCardsDynamically() {

//   //pointer to HTML elements
//   let hikeCardTemplate = document.getElementById("hikeCardTemplate");
//   let hikeCardGroup = document.getElementById("hikeCardGroup");
  
// // db.collection("users").doc()

//   // db.collection("hikes").get()
//   myGoals.get()
//       .then(allHikes => {
//           allHikes.forEach(doc => {
//               var hikeName = doc.data().name; //gets the name field
//               var hikeID = doc.data().code; //gets the unique CODE field
//               var hikeLength = doc.data().length; //gets the length field
//               let testHikeCard = hikeCardTemplate.content.cloneNode(true);
//               testHikeCard.querySelector('.card-title').innerHTML = hikeName;     //equiv getElementByClassName
//               testHikeCard.querySelector('.card-length').innerHTML = hikeLength;  //equiv getElementByClassName
//               testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);//equiv getElementByTagName
//               testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;   //equiv getElementByTagName
//               hikeCardGroup.appendChild(testHikeCard);
//           })

//       })
// }
// populateCardsDynamically();

//stores the Hike ID
function setHikeData(id){
  localStorage.setItem ('hikeID', id);
}

//returns hike ID from storage
var hikeID = localStorage.getItem("hikeID");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function saveGoal() {
    console.log("inside saveGoal")
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
  })
}


//   firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         //I may already have these and may not need them
//           // var currentUser = db.collection("users").doc(user.uid)
//           // var userID = user.uid;

//           //what I have for this section:
//           //currentUser =db.collection("users").doc(user.uid);
//           // myGoals = currentUser.collection("goals");
          
          
//           //get the document for current user.
//           currentUser.get()
//               .then(userDoc => {
//                   var userEmail = userDoc.data().email;
//                   myGoals.add({
//                       // code: hikeID,
//                       // userID: userID,
//                       category: goalCategory,
//                       theGoal: goalName,
//                       goalDescription: gDescription,
//                       endDate: goalTarget,
//                       timestamp: firebase.firestore.FieldValue.serverTimestamp()
//                   }).then(()=>{
//                     //send us to the next page, what should that be here?? maybe the goal list page
//                       window.location.href = "goals.html"; //new line added
//                   })
//               })
//       } else {
//           // No user is signed in.
//       }
//   });
// }
 



//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//function to save the goal information with listener on the confirm button
// function saveGoal() {
  // create a goal subcollection, maybe call a write goal function
  //
  //

  // userGoal = document.getElementById('goalTitle').value;       //get the value of the field with id="nameInput"
  // userSchool = document.getElementById('schoolInput').value;     //get the value of the field with id="schoolInput"
  // userCity = document.getElementById('cityInput').value;

// }




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