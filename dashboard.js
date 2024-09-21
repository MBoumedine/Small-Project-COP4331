// Sample contact list
const contacts = [
    { fullname: "John Doe", email: "john@example.com", phone: "555-555-5555" },
    { fullname: "Jane Smith", email: "jane@example.com", phone: "444-444-4444" },
    { fullname: "Alice Johnson", email: "alice@example.com", phone: "333-333-3333" }
];

let selectedContact = null;

function showTab(event, tabName) {
    // Remove 'active' class from all tab content
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove 'active-tab' class from all links
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => link.classList.remove('active-tab'));

    // Add 'active' class to the selected tab content
    document.getElementById(tabName).classList.add('active');

    // Add 'active-tab' class to the clicked tab link
    event.currentTarget.classList.add('active-tab');
}

function searchContact() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    const filteredContacts = contacts.filter(contact => 
        contact.fullname.toLowerCase().includes(searchInput)
    );

    filteredContacts.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = contact.fullname;
        li.onclick = () => showContactDetails(contact);
        searchResults.appendChild(li);
    });
}

function showContactDetails(contact) {
    selectedContact = contact;

    // Show contact details in the form
    document.getElementById('edit-fullname').value = contact.fullname;
    document.getElementById('edit-email').value = contact.email;
    document.getElementById('edit-phone').value = contact.phone;

    document.getElementById('contact-details').style.display = 'block';
    document.querySelector('.save').style.display = 'none';  // Hide save button
}

function enableEditing() {
    document.getElementById('edit-fullname').disabled = false;
    document.getElementById('edit-email').disabled = false;
    document.getElementById('edit-phone').disabled = false;
    document.querySelector('.save').style.display = 'inline';  // Show save button
}

function saveContact() {
    // Save the edited contact details
    selectedContact.fullname = document.getElementById('edit-fullname').value;
    selectedContact.email = document.getElementById('edit-email').value;
    selectedContact.phone = document.getElementById('edit-phone').value;
    
    // Disable editing again
    document.getElementById('edit-fullname').disabled = true;
    document.getElementById('edit-email').disabled = true;
    document.getElementById('edit-phone').disabled = true;
    document.querySelector('.save').style.display = 'none';  // Hide save button
}

function deleteContact() {
    const index = contacts.indexOf(selectedContact);
    if (index !== -1) {
        contacts.splice(index, 1);
        alert('Contact deleted successfully!');
        document.getElementById('contact-details').style.display = 'none';  // Hide details
        document.getElementById('search-results').innerHTML = ''; // Clear search results
    }
}
