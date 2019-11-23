$(document).ready(function() {
  const date = moment();
  console.log(moment());
  $("#currentDay").html(moment().format("LL"));

  var agenda = JSON.parse(localStorage.getItem("agenda")) || initializeAgenda();
  console.log(agenda);

  for (var key in agenda) {
    console.log(key, agenda[key]);
    var tr = $("<tr>");
    var tdTime = $("<td>")
      .addClass("hour")
      .text(key);
    var tdEvent = $("<td>");

    var time;
    if (moment(key, "h a").isSame(moment(), "hour")) {
      time = "present";
    } else if (moment(key, "h a").isAfter(moment())) {
      time = "future";
    } else if (moment(key, "h a").isBefore(moment())) {
      time = "past";
    }

    var eventText = $("<textarea>")
      .addClass("description")
      .addClass(time)
      .attr("data-time", key)
      .val(agenda[key]);
    tdEvent.append(eventText);
    var tdSubmit = $("<td>").addClass("saveBtn");
    var icon = $("<i>").addClass("fas fa save");
    tdSubmit.append(icon);
    tr.append(tdTime, tdEvent, tdSubmit);
    $("#myAgenda").append(tr);
  }

  function initializeAgenda() {
    var tempAgenda = {};

    for (var i = 9; i < 18; i++) {
      // tempAgenda.moment(i, "H").format("h a") = "";
      tempAgenda[moment(i, "H").format("h a")] = "";
    }

    return tempAgenda;
  }

  $(".saveBtn").on("click", function() {
    var time = $(this)
      .parent()
      .find(".description")
      .attr("data-time");
    var text = $(this)
      .parent()
      .find(".description")
      .val();
    console.log(time, text);

    agenda[time] = text;

    localStorage.setItem("agenda", JSON.stringify(agenda));
  });
});

// var data = {
//   name: "Ben"
// };

// console.log(data.name);
// data.age = 31;
// data["job"] = "tutor";
// console.log(data["name"]);
// console.log(data);

//calls moment and the current date for top of calendar

//loop through businessHours array to append new rows for each hour
// for (var i = 0; i < businessHours.length; i++) {
//   var time = businessHours[i];
//   $("#timeblock-table tbody").append(
//     "<tr class='hour parent-row'><td class=" +
//       `${time}` +
//       ">" +
//       time +
//       "</td><td><textarea class='description'></textarea></td><td class='saveBtn' " +
//       `id=${time}` +
//       "'>" +
//       "<i></i></td></tr>"
//   );
//   $("i").attr("class", "fas fa-save pt-3");
//   // $("textarea").attr("id", time);
//   // addClass("class", "" + businessHours[i] + "");
//   // $.each(businessHours, function(index, value) {
//   //   $("textarea").attr("id", value);
//   //   console.log(value);
//   // });
// }
// $(businessHours).each(function(index) {
//   $("textarea").attr("id", index[0]);
// });

// var appointment = localStorage.getItem("appointment");
// $("#7AM").text(appointment);

//Tried adding value to local storage with .this
// $("#text").on("click", function() {
//   $("#newInfo").each(function() {
//     var id = $(this).attr("id");
//     var value = $(this).val();
//     localStorage.setItem(id, value);
//   });
// });

// $("#test-parent").on("click", function() {
//   $(".description").each(function() {
//     var id = $(this).attr("id");
//     var value = localStorage.getItem(id);

//     $(this).val(value);
//   });
// });

// var appointment = localStorage.getItem("appointment");
// $("#8AM").text(appointment);

// $(".saveBtn").on("click", function() {
//   console.log("hello!");
//   console.log(event.target.previousSibling);
//   event.preventDefault();
//   var appointmentInput = $("#8AM").val();
//   localStorage.setItem("appointment", appointmentInput);
// });

// var appointment = localStorage.getItem("appointment");
// $(event.target.previousSibling).text(appointment);
// $(".saveBtn").on("click", function() {
//   console.log("hello!");
//   console.log(event.target.parentElement.children);
//   console.log(event.target.previousSibling);
//   event.preventDefault();
//   var appointmentInput = $(event.target.previousSibling).val();
//   localStorage.setItem("appointment", appointmentInput);
// });

// var appointment = localStorage.getItem("appointment");
// $("#newInfo").text(appointment);

// $(".saveBtn").on("click", function() {
//   console.log("hello!");
//   event.preventDefault();
//   var appointmentInput = $("#newInfo").val();
//   localStorage.setItem("appointment", appointmentInput);
// });

//   for (var i = 0; i < businessHours.length; i++) {
//     $("#timeblock-table tbody").append(
//       '<tr scope="row" class="row"><td>' + businessHours[i] + "</td></tr>"
//     );
//   }

//   $("#timeblock-table tr").append("<td><textarea></textarea></td>");

//   $("#timeblock-table tr").append("<td ><i class=''></i></td>");
//   $("i").attr("class", "fas fa-save saveBtn pt-3");

//   for (var i = 0; i < businessHours.length; i++) {
//     $("#timeblock-table tbody")
//       .find("tr")
//       .each(function() {
//         $(this)
//           .find("td")
//           .eq(0)
//           .after("<td>hello</td>");
//       });
//   }

//   for (var i = 0; i < businessHours.length; i++) {
//     $("#timeblock-table tbody").append(
//       "<tr><td><textarea>hello</textarea></td></tr>"
//     );
//   }

//   for (var i = 0; i < businessHours.length; i++) {
//     $("#timeblock-table tbody").append(
//       '<tr><td class="saveBtn"><i></i></td></tr>'
//     );
//     $("i").attr("class", "fas fa-save pt-3");
//   }

// //color coding past, present, future events
// var time = "11:30 pm"; //doesn't recognize AM/PM right now
// console.log(time);
// var now = moment().format("hh:mm a");
// console.log(now);

// var future = moment("hh:mm a").isAfter("11:30 pm");
// console.log(future);

// if (now > time) {
//   console.log("date is past");
// } else {
//   console.log("date is future");
// }

// var future = moment("9:00 PM").isSameOrAfter("9:00 AM", "h:mm A");

// console.log(future);
