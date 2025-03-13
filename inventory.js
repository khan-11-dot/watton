// Function to save data to localStorage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Function to get data from localStorage
function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Function to add new inventory entry
function addInventoryEntry(location, type) {
    const date = document.getElementById(`${type}-date`).value;
    const item = document.getElementById(`${type}-item`).value;
    const quantity = document.getElementById(`${type}-quantity`).value;
    const price = document.getElementById(`${type}-price`).value;
    const party = document.getElementById(`${type}-party`).value;
    const description = document.getElementById(`${type}-description`).value;

    const entry = {
        id: Date.now(),
        date,
        item,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        total: parseFloat(quantity) * parseFloat(price),
        party,
        description,
        timestamp: new Date().toISOString()
    };

    const storageKey = `${location}-${type}`;
    const entries = getFromLocalStorage(storageKey);
    entries.push(entry);
    saveToLocalStorage(storageKey, entries);

    // Update the table
    displayInventoryData(location);
    // Reset form
    document.getElementById(`${type}-form`).reset();
}

// Function to display inventory data
function displayInventoryData(location) {
    const incomingData = getFromLocalStorage(`${location}-incoming`);
    const outgoingData = getFromLocalStorage(`${location}-outgoing`);

    // Display incoming data
    const incomingTable = document.getElementById('incoming-table');
    if (incomingTable) {
        const incomingBody = incomingTable.querySelector('tbody');
        incomingBody.innerHTML = incomingData.map(entry => `
            <tr>
                <td>${new Date(entry.date).toLocaleDateString()}</td>
                <td>${entry.item}</td>
                <td>${entry.quantity}</td>
                <td>${entry.price}</td>
                <td>${entry.total}</td>
                <td>${entry.party}</td>
                <td>${entry.description}</td>
                <td>
                    <button onclick="deleteEntry('${location}-incoming', ${entry.id})" class="btn btn-danger btn-sm">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Display outgoing data
    const outgoingTable = document.getElementById('outgoing-table');
    if (outgoingTable) {
        const outgoingBody = outgoingTable.querySelector('tbody');
        outgoingBody.innerHTML = outgoingData.map(entry => `
            <tr>
                <td>${new Date(entry.date).toLocaleDateString()}</td>
                <td>${entry.item}</td>
                <td>${entry.quantity}</td>
                <td>${entry.price}</td>
                <td>${entry.total}</td>
                <td>${entry.party}</td>
                <td>${entry.description}</td>
                <td>
                    <button onclick="deleteEntry('${location}-outgoing', ${entry.id})" class="btn btn-danger btn-sm">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    updateInventorySummary(location);
}

// Function to delete an entry
function deleteEntry(storageKey, id) {
    const entries = getFromLocalStorage(storageKey);
    const updatedEntries = entries.filter(entry => entry.id !== id);
    saveToLocalStorage(storageKey, updatedEntries);
    
    // Update the table
    const location = storageKey.split('-')[0];
    displayInventoryData(location);
}

// Function to update inventory summary
function updateInventorySummary(location) {
    const incomingData = getFromLocalStorage(`${location}-incoming`);
    const outgoingData = getFromLocalStorage(`${location}-outgoing`);

    const totalIncoming = incomingData.reduce((sum, entry) => sum + entry.total, 0);
    const totalOutgoing = outgoingData.reduce((sum, entry) => sum + entry.total, 0);
    const balance = totalIncoming - totalOutgoing;

    document.getElementById('total-incoming').textContent = totalIncoming.toFixed(2);
    document.getElementById('total-outgoing').textContent = totalOutgoing.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

// Function to export data to Excel
function exportToExcel(location) {
    const incomingData = getFromLocalStorage(`${location}-incoming`);
    const outgoingData = getFromLocalStorage(`${location}-outgoing`);

    const wb = XLSX.utils.book_new();
    
    // Add incoming data sheet
    const incomingWS = XLSX.utils.json_to_sheet(incomingData);
    XLSX.utils.book_append_sheet(wb, incomingWS, "Incoming");
    
    // Add outgoing data sheet
    const outgoingWS = XLSX.utils.json_to_sheet(outgoingData);
    XLSX.utils.book_append_sheet(wb, outgoingWS, "Outgoing");
    
    // Save the file
    XLSX.writeFile(wb, `${location}-inventory.xlsx`);
}
