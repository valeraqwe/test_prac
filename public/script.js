// Check if the leadForm exists on the page
if (document.getElementById('leadForm')) {
    document.getElementById('leadForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Collect form data
        const formData = {
            id: new Date().getTime(),
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            status: 'New',
            ftd: 'No'
        };

        // Store in local storage
        let leads = JSON.parse(localStorage.getItem('leads')) || [];
        leads.push(formData);
        localStorage.setItem('leads', JSON.stringify(leads));

        // Clear the form
        document.getElementById('leadForm').reset();  // Добавьте эту строку

// Show popup
        const popup = document.getElementById('popup');
        const popupMessage = document.getElementById('popupMessage');

        popupMessage.textContent = 'Lead added successfully!';
        popup.style.backgroundColor = '#4CAF50';
        popup.style.opacity = '1';  // Добавьте эту строку
        popup.style.visibility = 'visible';  // Добавьте эту строку
        popup.classList.remove('hidden');

// Hide popup after 2 seconds
        setTimeout(() => {
            popup.classList.add('hidden');
            popup.style.opacity = '0';  // Добавьте эту строку
            popup.style.visibility = 'hidden';  // Добавьте эту строку
        }, 2000);
    });
}

// Check if the statusesTable exists on the page
if (document.getElementById('statusesTable')) {
    // Retrieve leads from local storage
    let leads = JSON.parse(localStorage.getItem('leads')) || [];

    const tableBody = document.getElementById('statusesTable').getElementsByTagName('tbody')[0];

    leads.forEach(row => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).innerText = row.id;
        newRow.insertCell(1).innerText = row.email;
        newRow.insertCell(2).innerText = row.status;
        newRow.insertCell(3).innerText = row.ftd;
    });
}
// ... ваш текущий код ...

// Функция для отображения лида в таблице
function displayLeads(leads) {
    const tableBody = document.getElementById('statusesTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Очистить текущие строки

    leads.forEach(row => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).innerText = row.id;
        newRow.insertCell(1).innerText = row.email;
        newRow.insertCell(2).innerText = row.status;
        newRow.insertCell(3).innerText = row.ftd;
    });
}

// Проверьте, существует ли таблица статусов на странице
if (document.getElementById('statusesTable')) {
    let leads = JSON.parse(localStorage.getItem('leads')) || [];
    displayLeads(leads);

    // Добавьте обработчик событий для кнопки фильтрации
    document.getElementById('filterButton').addEventListener('click', function() {
        const dateFrom = new Date(document.getElementById('dateFrom').value);
        const dateTo = new Date(document.getElementById('dateTo').value);

        const filteredLeads = leads.filter(lead => {
            const leadDate = new Date(lead.id);
            return leadDate >= dateFrom && leadDate <= dateTo;
        });

        displayLeads(filteredLeads);
    });
}

