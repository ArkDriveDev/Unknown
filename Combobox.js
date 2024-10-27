async function populateComboBox() {
    try {
        const response = await fetch('Classes\\Classes.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const select = document.getElementById('combo-box');
        // Clear existing options
        select.innerHTML = '';

        // Iterate through each category in the JSON
        for (const [key, classes] of Object.entries(data)) {
            classes.forEach(className => {
                const newOption = document.createElement('option');
                newOption.value = className; // or use key if needed
                newOption.textContent = className;
                select.appendChild(newOption);
            });
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Optionally show an error message in the UI
        const select = document.getElementById('combo-box');
        select.innerHTML = `<option disabled>Error loading options</option>`;
    }
}

function updateSelectValue() {
    const select = document.getElementById('combo-box');
    select.value = ""; // Optionally clear the select when typing
}

// Call the function to populate the combo box when the page loads
window.onload = populateComboBox;
