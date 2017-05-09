 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA8B1aUpZFP69o6AB1w5p5JRAo52vnm0VE",
    authDomain: "all-rounders-newsfeed.firebaseapp.com",
    databaseURL: "https://all-rounders-newsfeed.firebaseio.com",
    storageBucket: "all-rounders-newsfeed.appspot.com",
    messagingSenderId: "151133491596"
  };
  firebase.initializeApp(config);

  //oma skripti

  var headText = document.getElementById("otsikko");
  var mainText = document.getElementById("viesti") ;
  var submitBtn = document.getElementById("submitBtn");
  var deleteBtn = document.getElementById("deleteBtn");

  var provider = new firebase.auth.GoogleAuthProvider();

  function submitClick() {

  	// tekstin tallennus

  	var firebaseRef = firebase.database().ref();

  	var teksti = mainText.value;
    var otsikko = headText.value;
	var date = new Date();

        //Lisää viestin tieetokantaan
        firebaseRef.child("viestit").push().set({

        //Viestin otsikko
        otsikko: date.getDate() +"."+(date.getMonth()+1),
        //Viestin sisältö
        viesti: teksti
        });

  }

  // Viestin poisto
  function deleteClick(id) {
	var firebaseRef = firebase.database().ref("viestit/"+id);

	firebaseRef.remove();

    location.reload();
	}

  var rootRef = firebase.database().ref().child('viestit');

  //Lisää viestin näkymään
	rootRef.on('child_added', snap =>
		{ var viesti = snap.child("viesti").val();
		var uutinen = snap.child("otsikko").val();
    //Lisää viestin ja poistonappulan tauluun
			$("#messages").prepend("<div class='panel-heading' id='viestiotsikko'>"+uutinen+"</div>" +
			"<div class='panel-body' id='viestiketju'>" + viesti +"</div><button class='btn btn-danger'  onclick=deleteClick(&quot"+snap.key+"&quot)>Delete</button><br>");
      //Lisää poisto nappulan
     // $("#messages").append("<button class='btn btn-danger'  onclick=deleteClick(&quot"+snap.key+"&quot)>Delete</button>");
		});