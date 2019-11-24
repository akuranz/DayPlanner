$(document).ready(function() {
  const date = moment();
  console.log(moment());
  $("#currentDay").html(moment().format("LL"));

  //pulls agenda from local storage and uses initializeAgenda() function so nothing is null
  var agenda = JSON.parse(localStorage.getItem("agenda")) || initializeAgenda();
  console.log(agenda);

  //for loop for objects, key could be anything like i and agenda is the object
  for (var key in agenda) {
    //create table row
    var tr = $("<tr>");
    //create table cell save in tdTime with classes hour and row and pass .text key
    var tdTime = $("<td>")
      .addClass("hour")
      .text(key);

    //create table cell and save in tdEvent
    var tdEvent = $("<td>");
    //declare variable time
    var time;

    if (moment(key, "h a").isSame(moment(), "hour")) {
      time = "present";
      //else if the key in the 12 hour format and am/pm is the same as the hour right now,
      //set the time variable to future
    } else if (moment(key, "h a").isAfter(moment())) {
      time = "future";
      //else //if the key in the 12 hour format and am/pm is the same as the hour right now,
      //set the time variable to past
    } else if (moment(key, "h a").isBefore(moment())) {
      time = "past";
    }

    //create text element with class description,
    //the string held in the variable time,
    //set the data-time attribute to the key in the initializeAgenda funciton,
    //and get the value of the key in the agenda object as it loops throug
    var eventText = $("<textarea>")
      .addClass("description")
      .addClass(time)
      .attr("data-time", key)
      .val(agenda[key]);
    //append the text area eventTExt to the table cell tdEvent
    tdEvent.append(eventText);

    //create a table cell with class saveBtn
    var tdSubmit = $("<td>").addClass("saveBtn");
    //create a font awesome icon and set class to fas fa-save to display a save icon
    var icon = $("<i>").attr("class", "fas fa-save");
    //append the icon to the tsSubmit table cell
    tdSubmit.append(icon);

    //append the tdTime, tdEvent, and tdSubmit cells to the table row
    tr.append(tdTime, tdEvent, tdSubmit);
    //append the table row to the table body
    $("#myAgenda").append(tr);
  }

  //create a function Initialize Agenda to run a for loop and
  //create an object that holds times 9am - 5pm to prevent nothing showing up in the planner is null
  function initializeAgenda() {
    //declare a variable tempAgenda as an empty object
    var tempAgenda = {};

    //create a for loop starting at 9 bc that is the first hour in the day planner
    //set length to 18 so it increments 8 times
    for (var i = 9; i < 18; i++) {
      //tempAgenda.moment(i, "H").format("h a") = ""; <--won't work for objects
      //creates an array in the tempAgenda object of times
      tempAgenda[moment(i, "H").format("h a")] = "";
    }

    //returns the array
    return tempAgenda;
  }

  //when any element with class saveBtn is clicked, a function runs
  $(".saveBtn").on("click", function() {
    //variable time for this class move up one node,
    var time = $(this)
      .parent()
      //find descrition class in a sister and then child node in the textarea
      .find(".description")
      //gets the data-time attribute that we set from the object for loop
      .attr("data-time");
    var text = $(this)
      //variable text for this class move up one node,
      .parent()
      //find descrition class in a sister and then child node in the textarea
      .find(".description")
      //gets the value of the text area in the row that the button was clicked
      .val();
    console.log(time, text);

    //setting the key of time to the the text --> time: text
    agenda[time] = text;
    //create a an object for agenda to hold times and text
    localStorage.setItem("agenda", JSON.stringify(agenda));
  });
});
