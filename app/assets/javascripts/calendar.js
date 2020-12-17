let showCalendar;
$(document).ready(() => {

    function generate_year_range(start, end) {
      let years = "";
      for (let year = start; year <= end; year++) {
          years += "<option value='" + year + "'>" + year + "</option>";
      }
      return years;
    }

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectYear = document.getElementById("year");
    let selectMonth = document.getElementById("month");
    let createYear = generate_year_range(1970, 2077);

    console.log(document.getElementById("year"));

    document.getElementById("year").innerHTML = createYear;

    let calendar = document.getElementById("calendar");
    calendar.getAttribute('data-lang');
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    let dayHeader = "<tr>";
    for (let day in days) {
      dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
    }
    dayHeader += "</tr>";
    document.getElementById("thead-month").innerHTML = dayHeader;
    monthAndYear = document.getElementById("monthAndYear");
    

    showCalendar = function(month, year) {

      let firstDay = ( new Date( year, month ) ).getDay() - 1;

      let tbl = document.getElementById("calendar-body");


      tbl.innerHTML = "";


      monthAndYear.innerHTML = months[month] + " " + year;
      selectYear.value = year;
      selectMonth.value = month;

      // creating all cells
      let date = 1;
      for ( let i = 0; i < 6; i++ ) {
          let row = document.createElement("tr");

          for ( let j = 0; j < 7; j++ ) {
              if ( i === 0 && j < firstDay ) {
                  let cell = document.createElement( "td" );
                  let cellText = document.createTextNode("");
                  cell.appendChild(cellText);
                  row.appendChild(cell);
              } else if (date > daysInMonth(month, year)) {
                  break;
              } else {
                  let cell = document.createElement("td");
                  cell.setAttribute("data-date", date);
                  cell.setAttribute("data-month", month + 1);
                  cell.setAttribute("data-year", year);
                  cell.setAttribute("data-month_name", months[month]);
                  cell.className = "date-picker";
                  cell.innerHTML = "<span>" + date + '</span> <ul></ul>';

                  if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                      cell.className = "date-picker selected";
                  }
                  row.appendChild(cell);
                  date++;
              }
          }

          tbl.appendChild(row);
      }
    }

    showCalendar(currentMonth, currentYear);

    $('#next').click(()=>{
      currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
      currentMonth = (currentMonth + 1) % 12;
      $.get( "/load_notes", {year: currentYear, month: currentMonth});
    });

    $('#previous').click(()=>{
      currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
      currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
      $.get( "/load_notes", {year: currentYear, month: currentMonth});
    });

    $('.jump').click(()=>{
      currentYear = parseInt(selectYear.value);
      currentMonth = parseInt(selectMonth.value);
      $.get( "/load_notes", {year: currentYear, month: currentMonth});
    });
  

    function daysInMonth(iMonth, iYear) {
      return 32 - new Date(iYear, iMonth, 32).getDate();
    }
});
