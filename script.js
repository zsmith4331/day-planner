var appointmentText = "";
var appointmentTime = "";
var todaysDate;
var currentTime;
var appointmentContent;
var tempArray = [];
var saveAppointments;
var savedAppointments;



// moment.js //
$(window).on("load", function () {
    todaysDate = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").append(todaysDate);
    currentTime = moment().format("H");

    // Function to store appointments //
    function showAppointments() {
        // Get save appointments from localStorage //
        saveAppointments = JSON.parse(localStorage.getItem("appointments"));
        if (saveAppointments !== null) {
            for (i = 0; i < saveAppointments.length; i++) {
                savedAppointments = saveAppointments[i];
                details = savedAppointments.details;
                timeIndex = savedAppointments.time;
                if (details !== null) {
                    $("#" + timeIndex).children("div").children("div").children("textarea").val(details);
                }
            }
        }
    }

    // Calling function //
    showAppointments();

    // For loop //
    for (i = 0; i <= 23; i++) {
        appointmentContent = i;
        if (currentTime > i) {
            $("#" + appointmentContent).addClass("past");
            $("#" + appointmentContent).children("div").children("div").children("textarea").addClass("past");
        }
        else if (currentTime == i) {
                $("#" + appointmentContent).addClass("present");
                $("#" + appointmentContent).children("div").children("div").children("textarea").addClass("present");
        }
        else {
            $("#" + appointmentContent).addClass("future");
            $("#" + appointmentContent).children("div").children("div").children("textarea").addClass("future");
        }
    }
})

// Save Button Click Event //
$(".saveBtn").click(function () {
    appointmentText = $(this).parent("div").children("div").children("textarea").val();
    appointmentTime = $(this).parent("div").parent().attr("id");
    appointment = {
        time: appointmentTime,
        details: appointmentText
    }
    tempArray = JSON.parse(localStorage.getItem("appointments"));
    if (tempArray === null) {
        localStorage.setItem("appointments", JSON.stringify([{ time: appointmentTime, details: appointmentText }]));
    }
    else {
        tempArray.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(tempArray));

    }
    $(this).parent("div").children("div").children("textarea").replaceWith($("<textarea>" + appointmentText.addClass("textarea") + "</textarea>"));
})