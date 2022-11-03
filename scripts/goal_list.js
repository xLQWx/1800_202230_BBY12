function writeGoals() {
    max = 10;
    var goalsRef = db.collection("goals");
    for (i = 1; i <= max; i++) {
        goalsRef.add({
            title: "goal" + i,
            description: "a summary for a goal" + i,
            date: "fake time for now"
        })
    }
}

function displayGoals(collection) {
    let goalsTemplate = document.getElementById("goalCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => {
                var title = doc.data().title;
                var description = doc.data().description;
                var date = doc.data().date;

                let newGoalCard = goalsTemplate.content.cloneNode(true);

                //update title, descripton, and date
                newGoalCard.querySelector('.goal_title').innerHTML = title;
                newGoalCard.querySelector('.goal_description').innerHTML = description;
                newGoalCard.querySelector('.goal_date').innerHTML = date;

                newGoalCard.querySelector('.goal_title').setAttribute("id", "gtitle" + i);
                newGoalCard.querySelector('.goal_description').setAttribute("id", "gdescription" + i);
                newGoalCard.querySelector('.goal_date').setAttribute("id", "gdate" + i);

                //attach to the body
                document.getElementById(collection + "-go-here").appendChild(newGoalCard);
                i++;
            })
        })
}
displayGoals("goals");