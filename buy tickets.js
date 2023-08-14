const daysContainer = document.querySelector(".days"),
  nextBtn = document.querySelector(".next-btn"),
  prevBtn = document.querySelector(".prev-btn"),
  month = document.querySelector(".month"),
  todayBtn = document.querySelector(".today-btn");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// get current date
const date = new Date();

// get current month
let currentMonth = date.getMonth();

// get current year
let currentYear = date.getFullYear();

// function to render days
function renderCalendar() {
  // get prev month current month and next month days
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  // update current year and month in header
  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  // update days html
  let days = "";

  // prev days html
  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  // current month days
  for (let i = 1; i <= lastDayDate; i++) {
    // check if its today then add today class
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      // if date month year matches add today
      days += `<div class="day today">${i}</div>`;
    } else {
      //else dont add today
      days += `<div class="day ">${i}</div>`;
    }
  }

  // next MOnth days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }

  // run this function with every calendar render
  hideTodayBtn();
  daysContainer.innerHTML = days;
}

renderCalendar();

nextBtn.addEventListener("click", () => {
  // increase current month by one
  currentMonth++;
  if (currentMonth > 11) {
    // if month gets greater that 11 make it 0 and increase year by one
    currentMonth = 0;
    currentYear++;
  }
  // rerender calendar
  renderCalendar();
});

// prev monyh btn
prevBtn.addEventListener("click", () => {
  // increase by one
  currentMonth--;
  // check if let than 0 then make it 11 and deacrease year
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

// go to today
todayBtn.addEventListener("click", () => {
  // set month and year to current
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  // rerender calendar
  renderCalendar();
});

// lets hide today btn if its already current month and vice versa

function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
  function updateSummary() {
    // ... (existing code)

    const selectedDate = daysContainer.querySelector(".today");

    // Add selected date to the summary table
    summaryTable.innerHTML += `
    <tr>
      <td><strong>Date</strong></td>
      <td>${Date.textContent}</td>
    </tr>
  `;

    // ... (existing code)
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const durationCheckboxes = document.querySelectorAll(".duration-checkbox");

  function getSelectedDurations() {
    const selectedDurations = [];
    durationCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedDurations.push(checkbox.value);
      }
    });
    return selectedDurations;
  }

  const sLAdult = document.getElementById("sLadult");
  const sLChild = document.getElementById("sLchild");
  const foreignerAdult = document.getElementById("foreigneradult");
  const foreignerChild = document.getElementById("foreignerchild");
  const infant = document.getElementById("infant");
  const durationSelect = document.getElementById("duration");
  const summaryTable = document.getElementById("summary-table");
  const purchaseButton = document.getElementById("purchase-button");

  const priceList = {
    "Foreigner Adult": { normalHour: 10, peakHour: 13 },
    "Foreigner Child": { normalHour: 5, peakHour: 8 },
    "SL Adult": { normalHour: 4, peakHour: 6 },
    "SL Child": { normalHour: 2, peakHour: 3 },
  };

  function updateSummary() {
    const selectedDate = daysContainer.querySelector(".today");
    const selectedDurations = getSelectedDurations();
    const sLAdultCount = parseInt(sLAdult.value) || 0;
    const sLChildCount = parseInt(sLChild.value) || 0;
    const foreignerAdultCount = parseInt(foreignerAdult.value) || 0;
    const foreignerChildCount = parseInt(foreignerChild.value) || 0;
    const infantCount = parseInt(infant.value) || 0;
    const duration = durationSelect.value;

    const totalGuests =
      sLAdultCount +
      sLChildCount +
      foreignerAdultCount +
      foreignerChildCount +
      infantCount;

    let durationSummary = "";
    selectedDurations.forEach((duration) => {
      durationSummary += `<tr>
                                <td><strong>Selected Duration</strong></td>
                                <td><strong>${duration}</strong></td>
                                <td></td>
                                <td></td>
                              </tr>`;
    });
    summaryTable.innerHTML = `
<tr><th>${durationSummary}<th><tr>
    <thead>
    
      <tr>
       <th>Date></th>
        <th>Ticket Category</th>
        <th>Quantity</th>
        <th>Charge per Ticket</th>
        <th>Total Charge</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SL Adult Ticket${sLAdultCount !== 1 ? "s" : ""}</td>
        <td>${sLAdultCount}</td>
        <td>${
          priceList["SL Adult"][
            duration.includes("pm") ? "peakHour" : "normalHour"
          ]
        }</td>
        <td>${
          sLAdultCount *
          priceList["SL Adult"][
            duration.includes("pm") ? "peakHour" : "normalHour"
          ]
        }</td>
      </tr>
      <tr>
        <td>SL Child Ticket${sLChildCount !== 1 ? "s" : ""}</td>
        <td>${sLChildCount}</td>
        <td>${
          priceList["SL Child"][
            duration.includes("pm") ? "peakHour" : "normalHour"
          ]
        }</td>
        <td>${
          sLChildCount *
          priceList["SL Child"][
            duration.includes("pm") ? "peakHour" : "normalHour"
          ]
        }</td>
      </tr>
      <tr>
        <td>Foreigner Adult Ticket${foreignerAdultCount !== 1 ? "s" : ""}</td>
        <td>${foreignerAdultCount}</td>
        <td>${
          priceList["Foreigner Adult"][
            duration.includes("pm") ? "peakHour" : "normalHour"
          ]
        }</td>
        <td>${
          foreignerAdultCount *
          priceList["Foreigner Adult"][
            duration.includes("pm") ? "peakHour" : "normalHour"
          ]
        }</td>
      </tr>
      <tr>
        <td>Foreigner Child Ticket${foreignerChildCount !== 1 ? "s" : ""}</td>
        <td>${foreignerChildCount}</td>
        <td>${
          priceList["Foreigner Child"][
            duration.includes("pm") ? "peakHour" : "normalHour"
          ]
        }</td>
        <td>${
          foreignerChildCount *
          priceList["Foreigner Child"][
            duration.includes("pm") ? "peakHour" : "normalHour"
          ]
        }</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td><strong>Total Payable</strong></td>
        <td><strong>${totalGuests}</strong></td>
        <td></td>
        <td><strong></strong></td>
      </tr>
    </tfoot>
  `;

    purchaseButton.disabled = totalGuests === 0;
    purchaseButton.addEventListener("click", function () {
      // Redirect the user to details.html
      window.location.href = "details.html";
    });
  }

  durationCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateSummary);
  });

  sLAdult.addEventListener("input", updateSummary);
  sLChild.addEventListener("input", updateSummary);
  foreignerAdult.addEventListener("input", updateSummary);
  foreignerChild.addEventListener("input", updateSummary);
  infant.addEventListener("input", updateSummary);
  durationSelect.addEventListener("change", updateSummary);

  updateSummary();
});

function updateSummary() {
  // ... (existing code)

  const selectedDate = daysContainer.querySelector(".today");

  // Add selected date to the summary table
  summaryTable.innerHTML += `
    <tr>
      <td><strong>Selected Date</strong></td>
      <td>${selectedDate.textContent}</td>
    </tr>
  `;

  // ... (existing code)
}

// details.js

// payment
