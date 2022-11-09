var currentUser; //global variable, points to logged in user

function populateInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var userName = userDoc.data().name;
        var userSchool = userDoc.data().school;
        var userCity = userDoc.data().city;

        //if the data fields are not empty, then write them in to the form.
        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (userSchool != null) {
          document.getElementById("schoolInput").value = userSchool;
        }
        if (userCity != null) {
          document.getElementById("cityInput").value = userCity;
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it
populateInfo();

//This is our event listener
function editUserInfo() {
  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = false;
}

function saveUserInfo() {
  console.log("inside save user info");
  userName = document.getElementById("nameInput").value; //get the value of the field with id="nameInput"
  userSchool = document.getElementById("schoolInput").value; //get the value of the field with id="schoolInput"
  userCity = document.getElementById("cityInput").value; //get the value of the field with id="cityInput"

  currentUser
    .update({
      name: userName,
      school: userSchool,
      city: userCity,
    })
    .then(() => {
      console.log("Document successfully updated!");
    });
  document.getElementById("personalInfoFields").disabled = true;
}

/*
 This is Harrison's extra work here, I am trying to figure out how to handle subcolections and populate them

db.collection("users").doc("user.uid").collection("goals").doc("goal.gid").

 */
var completionDate = userDoc.data().Ends;
var goalDescr = userDoc.data().Description;
var goalTitle = userDoc.data().Goal;
var category = userDoc.data().Category;


saveGoal();

function saveGoal() {
  console.log("New goal succcessfully saved");
  goalDescr = document.getElementById("goalDetail").value;
  goalTitle = document.getElementById("goalName").value; 
  category = document.getElementById("goalCategory").value;


  
}
