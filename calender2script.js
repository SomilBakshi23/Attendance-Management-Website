const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year, and month
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

// storing the full name of all months in an array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); // getting the first day of the month
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting the last date of the month
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); // getting the last day of the month
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting the last date of the previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of the current month
        // adding an active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current month and year as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is the previous icon then decrement the current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) { // if the current month is less than 0 or greater than 11
            // creating a new date of the current year & month and pass it as the date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating the current year with the new date year
            currMonth = date.getMonth(); // updating the current month with the new date month
        } else {
            date = new Date(); // pass the current date as the date value
        }
        renderCalendar(); // calling the renderCalendar function

        // Add the redirection logic here
        if (icon.id === "next") {
            window.location.href = "markattendance.html"; // Replace with the URL of the next page
        }
    });
});
