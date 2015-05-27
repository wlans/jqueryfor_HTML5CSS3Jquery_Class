
$(function() {
		$( "input" ).change(function() {
  		bookingCalcDisplay();
		});

		$( "select" ).change(function() {
  		bookingCalcDisplay();
		});

		$.getJSON( "data.json", function( data ) {
  		$.each( data, function( key, val ) {
    		$('#destinationCityid').append("<option value='" + val + "'>" + key + "</option>");
    	});
  	});	


  	  $( "#from" ).datepicker({
    altField: "#alternate",
    altFormat: "DD, d MM, yy",
    minDate: 0,
    maxDate: "+60D",
    onSelect: function(selected) {
      calcDiff();
      bookingCalcDisplay();
    }
  });

  $( "#to" ).datepicker({
    altField: "#alternate1",
    altFormat: "DD, d MM, yy",
    minDate: 1,
    maxDate:"+60D",
    onSelect: function(selected) {
      $("#from").datepicker("option","maxDate", selected);
      calcDiff();
      bookingCalcDisplay();
    }
  });

  function calcDiff() {
    var date1 = $('#from').datepicker('getDate');
    var date2 = $('#to').datepicker('getDate');
    var diff = 0;
    $('#datesbetween').empty();
    if (date1 && date2) {
      diff = Math.floor((date2.getTime() - date1.getTime()) / 86400000);
        for(var d = date1.getTime(); d <= date2.getTime(); d = d + 86400000){
   
        }
    }
    $('#daysTraveling').val(diff);
  }


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

	 if(validation(costOfbooking (destinationCity,daysTraveling,firstClasstravel,spouseTraveling)) === true) {

	 	resultsDIVtochange.innerHTML = "Hi, " + fullName + " you are traveling to " + destinationCity + " and your booking cost is " + costOfbooking(destinationCity,daysTraveling,firstClasstravel,spouseTraveling) + " dollars. " + passportNeeded(destinationCity,nationality) + extraTraveloptions(spouseTraveling,firstClasstravel);

	 	} else if (validation(costOfbooking (destinationCity,daysTraveling,firstClasstravel,spouseTraveling)) === false) {

	 	resultsDIVtochange.innerHTML = "Error, Cost can not be 0";

	 	};
};

function costOfbooking (destinationCity,daysTraveling,firstClasstravel,spouseTraveling) {
	var form = document.getElementById("costform");
	var dayCost = form.destinationCity.value;
	var totalCostforTrip = 0;
	var firstClasstravelCost = 400;
	var spouseTravelingmultiplier = 2;

	if (destinationCity !== "") {
		totalCostforTrip += daysTraveling * dayCost
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

function validation (cost) {
	if (cost > 0) {
		return true
	} else if (cost > 0) {
			return false
	};
};

// DatePicker

$(document).ready(function() {

});