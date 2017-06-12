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
	firstTrain = $("#firstTrain-input").val().trim();
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

database.ref().on("child-added", function(snapshot){

		console.log(snapshot.val());
		console.log(snapshot.val().name);
		console.log(snapshot.val().destination);
		console.log(snapshot.val().firstTrain);
		console.log(snapshot.val().frequency);


});




