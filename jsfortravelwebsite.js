
$(function() {
		$( "input" ).change(function() {
  		bookingCalcDisplay();
		});

		$.getJSON( "data.json", function( data ) {
  		$.each( data, function( key, val ) {
    		$('#destinationCityid').append("<option value='" + val + "'>" + key + "<?option>");
    	});
  	});	
});

function bookingCalcDisplay () {
	 var form = document.getElementById("costform");
	 var fullName = form.fullName.value;
	 var destinationCity = $( "#destinationCityid option:selected" ).text();
	 var nationality = form.nationality.value;
	 var daysTraveling = parseInt(form.daysTraveling.value);
	 var firstClasstravel = form.firstClasstravel.checked;
	 var spouseTraveling = form.spouseTraveling.checked;
	 var resultsDIVtochange = document.getElementById("results");
	 var errorForForm = document.getElementById("errorForForm");
	 resultsDIVtochange.innerHTML = "Hi, " + fullName + " you are traveling to " + destinationCity + " and your booking cost is " + costOfbooking(destinationCity,daysTraveling,firstClasstravel,spouseTraveling) + " dollars. " + passportNeeded(destinationCity,nationality) + extraTraveloptions(spouseTraveling,firstClasstravel);
	
	
};

function costOfbooking (destinationCity,daysTraveling,firstClasstravel,spouseTraveling) {
	var form = document.getElementById("costform");
	var dayCostforMiamiandMeixco = form.destinationCity.value;
	var dayCostforNewYorkandLosAngeles = form.destinationCity.value;
	var totalCostforTrip = 0;
	var firstClasstravelCost = 400;
	var spouseTravelingmultiplier = 2;

	if (destinationCity === "Miami" || destinationCity === "Mexico City") {
		totalCostforTrip += daysTraveling * dayCostforMiamiandMeixco
	} else if (destinationCity === "New York" || destinationCity === "Los Angeles") {
		totalCostforTrip += daysTraveling * dayCostforNewYorkandLosAngeles
	} else {
		totalCostforTrip === null;
		return "ERROR! No city provided"
	};

	if (firstClasstravel === true) {
		totalCostforTrip += firstClasstravelCost; 
	};

	if (spouseTraveling === true) {
		totalCostforTrip *= spouseTravelingmultiplier; 
	};

	return totalCostforTrip;
	// Do error checking code in a catch block
};

function passportNeeded (destinationCity,nationality) {
	if (nationality === "Mexico" && destinationCity === "Mexico City") {
		return "You do not need a passport to travel here.";
	} else if (nationality !== "Mexico" && destinationCity === "Mexico City") {
		return "You are from " + nationality + " and are traveling to " + destinationCity + " so you will need to bring your passport!";
	} else {
		return "You are from " + nationality + " and are traveling to " + destinationCity + " so you will not need to bring your passport!";  ;
	};
};

function extraTraveloptions (spouseTraveling,firstClasstravel) {
	var extraTraveloptionsvar = "";

	if (spouseTraveling === true && firstClasstravel === true) {
		extraTraveloptionsvar += " You are traveling First Class with your spouse so we added on 400 dollars and times the total by two. "
	}
	else if (spouseTraveling === true ) {
		extraTraveloptionsvar += " You are traveling with your spouse so we times the total by two. "
	}
	else if (firstClasstravel === true) {
		extraTraveloptionsvar += " You are traveling First Class. Enjoy "
	} else {
		extraTraveloptionsvar === ""
	};
	return extraTraveloptionsvar; 
};

function validation (fullName,daysTraveling) {
	var reqExpForLettersValidtion = /^[a-zA-Z]+$/;
	if (reqExpForLettersValidtion.test(fullName) && !isNaN(daysTraveling)) {
		return true;
	}
};
