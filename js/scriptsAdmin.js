 // Initialize Firebase
  var config2 = {
    apiKey: "AIzaSyByowOf5ApuGMakV8WzFR13OFjC_8MmwxQ",
    authDomain: "sakko-dd595.firebaseapp.com",
    databaseURL: "https://sakko-dd595.firebaseio.com",
    projectId: "sakko-dd595",
    storageBucket: "sakko-dd595.appspot.com",
    messagingSenderId: "113575412889"
  };
  firebase.initializeApp(config2);

  //oma skripti

  var headText = document.getElementById("otsikko");
  var mainText = document.getElementById("viesti") ;
  var submitBtn = document.getElementById("submitBtn");
  var deleteBtn = document.getElementById("deleteBtn");

  var provider = new firebase.auth.GoogleAuthProvider();

  function submitKlick() {

  	// tekstin tallennus

  	var firebaseRef = firebase.database().ref();

  	var teksti = mainText.value;
    //var otsikko = headText.value;
	var date = new Date();

        //Lisää viestin tieetokantaan
        firebaseRef.child("viestit").push().set({

        //Viestin otsikko
        otsikko: date.getDate() +"."+(date.getMonth()+1),
        //Viestin sisältö
        viesti: teksti
        });
	$("#otsikko").val('');
	$("#viesti").val('');
  }

  // Viestin poisto
  function deleteClick(id) {
	var firebaseRef = firebase.database().ref("viestit/"+id);

	firebaseRef.remove();

    location.reload();
	}

  var rooRef = firebase.database().ref().child('viestit');

  //Lisää viestin näkymään
	rooRef.on('child_added', snap =>
		{ var viesti = snap.child("viesti").val();
		var uutinen = snap.child("otsikko").val();
    //Lisää viestin ja poistonappulan tauluun
			$("#messages").prepend("<div class='panel-heading' id='viestiotsikko'>"+uutinen+"</div>" +
			"<div class='panel-body' id='viestiketju'>" + viesti +"</div><button class='btn btn-warning'  onclick=deleteClick(&quot"+snap.key+"&quot)>Poista</button><br>");
      //Lisää poisto nappulan
     // $("#messages").append("<button class='btn btn-danger'  onclick=deleteClick(&quot"+snap.key+"&quot)>Delete</button>");
		});