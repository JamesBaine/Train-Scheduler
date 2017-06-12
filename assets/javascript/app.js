// Initialize Firebase
var config = {
    apiKey: "AIzaSyDphoxtNAklT2XOKdznd9MpSlNe_lPzrKs",
    authDomain: "train-scheduler-279a9.firebaseapp.com",
    databaseURL: "https://train-scheduler-279a9.firebaseio.com",
    projectId: "train-scheduler-279a9",
    storageBucket: "train-scheduler-279a9.appspot.com",
    messagingSenderId: "590364032522"
};

firebase.initializeApp(config);


//Initial values
var name = "";
var destination = "";
var firstTrain = ""
var frequency = 0;

var database = firebase.database();

$("#add-train").on("click", function(){

	event.preventDefault();

	name = $("#name-input").val().trim();
	destination = $("#destination-input").val().trim();
	var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
	frequency = $("#frequency-input").val().trim();
	

	database.ref().push({
		name: name,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	});

	$("#name-input").val("");
	$("#destination-input").val("");
	$("#firstTrain-input").val("");
	$("#frequency-input").val("");

	return false;

});

database.ref().on("child_added", function(snapshot){

		console.log(snapshot.val());
		console.log(snapshot.val().name);
		console.log(snapshot.val().destination);
		console.log(snapshot.val().firstTrain);
		console.log(snapshot.val().frequency);

		var newName = snapshot.val().name;
		var newDestination = snapshot.val().destination;
		var newFrequency = snapshot.val().frequency;
		var newFirstTrain = snapshot.val().firstTrain;

		var timesDiff = moment().diff(moment.unix(newFirstTrain), "minutes");
		var remainder = moment().diff(moment.unix(newFirstTrain), "minutes") % newFrequency;
		var minutes = newFrequency - remainder;

		var arrival = moment().add(minutes, "m").format("hh:mm A");
		console.log(minutes);
		console.log(arrival);
		console.log(moment().format("X"));

		loop = [];
		loop.push(newName, newDestination, newFrequency, arrival, minutes);

		var tr = $("<tr>");
		for (i = 0; i < loop.length ; i++) {
			var td = $("<td>");
			td.append(loop[i]);
			tr.append(td);
		}

		$("#train-schedule").append(tr);

		}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

});







