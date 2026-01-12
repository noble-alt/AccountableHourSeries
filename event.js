document.addEventListener("DOMContentLoaded", function() {
    const monthYearElement = document.querySelector(".cal-nav span");
    const calendarGrid = document.querySelector(".cal-grid");
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    // Hardcoded meeting dates for the current month and year
    // In a real application, this would come from a database.
    const meetingDates = [5, 12, 19, 26];

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function renderCalendar(month, year) {
        // Clear existing calendar days, but keep the day headers
        const dayHeaders = Array.from(calendarGrid.querySelectorAll('.day-head'));
        calendarGrid.innerHTML = '';
        dayHeaders.forEach(header => calendarGrid.appendChild(header));


        monthYearElement.textContent = `${monthNames[month]} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add blank divs for the days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const blankDay = document.createElement("div");
            calendarGrid.appendChild(blankDay);
        }

        // Add the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("div");
            dayElement.textContent = day;

            // Highlight the current day
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add("current-day");
            }

            // Add a white circle for meeting dates
            if (meetingDates.includes(day)) {
                dayElement.classList.add("active-day");
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    renderCalendar(currentMonth, currentYear);
});
