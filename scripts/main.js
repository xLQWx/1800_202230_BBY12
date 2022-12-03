function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            user_Name = user.displayName;

            $("#name-goes-here").text(user_Name); //using jquery

        } else {
            // No user is signed in.
        }
    });
}
insertName(); //run the function

var currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        //console.log("current user: " + user.uid);
        
        populateGoalsDynamically();
    } else {
        console.log("no user found");
        window.location.href = "login.html";
    }
});

function populateGoalsDynamically() {
    let goalCardTemplate = document.getElementById("goalCardTemplate"); //card template
    let goalCardGroup = document.getElementById("goals-go-here"); //where to append card

    currentUser.collection("goals")
    .orderBy("timestamp")
    .limit(4)
        .get()
        .then(allGoals => {
            allGoals.forEach(doc => {
                var category = doc.data().category; //gets goal category
                var goal = doc.data().goal; //gets goal name
                var description = doc.data().description; //gets the description
                var date = doc.data().endDate;//gets target date
                //console.log("goal: " + doc.id + " is displayed")

                let goalCard = goalCardTemplate.content.cloneNode(true);

                goalCard.querySelector('.goal-title').innerHTML = goal;
                goalCard.querySelector('.goal-category').innerHTML = category;
                goalCard.querySelector('.goal-description').innerHTML = description;
                goalCard.querySelector('.goal-date').innerHTML = date;

                //pass goal doc id with url
                goalCard.querySelector('a').href = "eachGoal.html?id="+ doc.id;
          
                goalCardGroup.appendChild(goalCard);
            })
        })
}



