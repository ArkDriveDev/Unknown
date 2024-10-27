class Recordsfunctions {
    constructor(logs, results) {
        this.Logs = document.getElementById(logs); // This is the display area for cards
        this.result = document.getElementById(results);
        this.AttendanceRecords = JSON.parse(localStorage.getItem('AttendanceRecords')) || [];
        this.bindSearchEvent(); // Bind search event
    }

    loadRecords() {
        this.renderRecords(this.AttendanceRecords); // Load all records initially
        const logCount = this.AttendanceRecords.length;
        this.result.innerHTML = `Result: ${logCount}`; // Update the count
    }

    renderRecords(records) {
        this.Logs.innerHTML = ""; // Clear previous logs

        records.forEach(cardHTML => {
            const cardElement = document.createElement("div");
            cardElement.innerHTML = cardHTML; // Set innerHTML to the card HTML
            this.Logs.appendChild(cardElement); // Append the card element
        });
    }

    clearRecords() {
        localStorage.removeItem('AttendanceRecords');
        this.AttendanceRecords = []; // Reset the array
        this.loadRecords(); // Refresh the display
    }

    // Bind search event from navbar.js with id searchbar
    bindSearchEvent() {
        const searchBar = document.getElementById('searchBar');
        searchBar.addEventListener('input', () => {
            // On caret searchbar event, call the filterRecords
            this.filterRecords(searchBar.value);
        });
    }

    // Caret input data in search bar then filter ResultCount
    filterRecords(query) {
        const filteredRecords = this.AttendanceRecords.filter(record => 
            record.toLowerCase().includes(query.toLowerCase())
        );
        // Calling the renderRecords function to render filtered data
        this.renderRecords(filteredRecords); // Render filtered records
        const logCount = filteredRecords.length;
        this.result.innerHTML = `Result: ${logCount}`; // Update the count
    }
}

// Create an instance of Recordsfunctions and load records on window load
window.onload = () => {
    const recordsFunctions = new Recordsfunctions('CardDisplay', 'ResultCount'); 
    recordsFunctions.loadRecords(); // Call the loadRecords method

    document.getElementById('clearButton').onclick = () => {
        recordsFunctions.clearRecords(); // Call the clearRecords method
    };
};
