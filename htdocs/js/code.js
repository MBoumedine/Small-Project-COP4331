const urlBase = 'http://mblampprac.xyz/LAMPAPI';
const extension = 'php';

let user_id = 0;
let Name = ""; 
let contacts = [];
let selectedContact = null;

window.onload = function() {
    readCookie();
    if (user_id == 0) {
        // Redirect to login if no cookie is found
        window.location.href = "index.html";
    } else {
        console.log("Welcome back, " + Name);
    }
}

function doLogin(event)
{
	user_id = 0;

	event.preventDefault();

	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {username:username,password:password};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			// if readyState is 4 then the request is done, 200 means "OK"
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				user_id = jsonObject.id;
		
				if( user_id < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "Username/Password combination incorrect";
					return;
				}

				console.log(user_id);

				Name = jsonObject.name;
				saveCookie(user_id, Name);
				readCookie();
	
				window.location.href = "dashboard.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doSignup(event)
{
	user_id = 0;

	event.preventDefault();
	
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	
	document.getElementById("signupResult").innerHTML = "";

	let tmp = {username:username,password:password};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Signup.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			// if readyState is 4 then the request is done, 200 means "OK"
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse(xhr.responseText);
				
				if(jsonObject.error != "")
				{		
					document.getElementById("signupResult").innerHTML = "Username already exists";
					return;
				}
				alert("Successfully signed up");
				window.location.href = "index.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}

}

function createContact(form) {
	console.log("Made it into savecontact");

	if (!form.checkValidity()) {
		return false; // prevent form submission
	}

	const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
	const phone = document.getElementById('phone').value;
	
	
	//readCookie();
	console.log(user_id);

	let tmp = {user_id:user_id,name:fullname,email:email,phone_number:phone};
	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/create_contact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			// if readyState is 4 then the request is done, 200 means "OK"
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse(xhr.responseText);

				console.log(jsonObject.message);

				alert("Successfully created a contact");
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log("error retrieving contacts from database");
	}
/*
    // Update contact in the original contacts array
    contacts[contactIndex] = { fullname, email, phone };
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Clear local storage
    localStorage.removeItem('editContactIndex');
    localStorage.removeItem('editContact');

    // Set a flag to activate the search tab after redirecting
    localStorage.setItem('activeTab', 'search');

    // Redirect back to the dashboard
    window.location.href = 'dashboard.html';
	*/
}

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

function showContactDetails(contact) {
	console.log("showing contact details");
    selectedContact = contact;

    // Show contact details in the form
    document.getElementById('edit-fullname').value = contact.name;
    document.getElementById('edit-email').value = contact.email;
    document.getElementById('edit-phone').value = contact.phone_number;
    console.log("Selected contact ID:", contact.contact_id);
    document.getElementById('contact-details').style.display = 'block';
    document.querySelector('.save').style.display = 'none';  // Hide save button
}


function enableEditing() {
    document.getElementById('edit-fullname').disabled = false;
    document.getElementById('edit-email').disabled = false;
    document.getElementById('edit-phone').disabled = false;
    document.querySelector('.save').style.display = 'inline';  // Show save button
}

function saveContact(button) {
	updateContact()

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

function deleteContact(button) {
	console.log("inside delete contact function");
	// const index = contacts.indexOf(selectedContact);
	// console.log("index of item to be deleted: " + index);
    // if (index !== -1) {
    //     contacts.splice(index, 1);
    //     alert('Contact deleted successfully!');
    //     document.getElementById('contact-details').style.display = 'none';  // Hide details
    //     document.getElementById('search-results').innerHTML = ''; // Clear search results
    // }

	//let dynamicContactId = button.getAttribute("data-id");

	let tmp = {contactId:selectedContact.contact_id};
	let jsonPayload = JSON.stringify( tmp );
	
	console.log(selectedContact.contact_id)

	let url = urlBase + '/delete_contact.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	try {
		xhr.onload = function () {
			// if readyState is 4 then the request is done, 200 means "OK"
			if (this.readyState == 4 && this.status === 200) {
				let jsonObject = JSON.parse(xhr.responseText);

				console.log(jsonObject.message);

				alert("Successfully deleted a contact");
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		console.log("error deleting contact from database");
	}
}

function searchContact() {
	console.log("searching for contact");
	const query = document.getElementById('search-query').value.toLowerCase();

	const searchResults = document.getElementById('search-results');
	searchResults.innerHTML = '';

	let contacts = [];
	let url = urlBase + '/search_contact.' + extension + `?q=${encodeURIComponent(query)}&user_id=${encodeURIComponent(user_id)}`;

	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	try {
		xhr.onload = function () {
			// if readyState is 4 then the request is done, 200 means "OK"
			if (this.readyState == 4 && this.status === 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				
				if (jsonObject.status == "success") {
					// If successfully returned the list of contacts
					contacts = jsonObject.contacts;
					console.log("Successfully retrieved " + contacts.length + " contacts from database.");		
					
					if (contacts.length > 0) {
						contacts.forEach(contact => {
							const li = document.createElement('li');
							li.textContent = contact.name;
							li.onclick = () => showContactDetails(contact);
							searchResults.appendChild(li);
						});
					}
				}
				else {
					searchResults.textContent = 'No contacts found.';
				}
			}
		};
		xhr.send();
	}
	catch(err)
	{
		console.log("error retrieving contacts from database");
	}
}
					

function updateContact() {
	let contactId = selectedContact.contact_id; // Assuming this is still coming from selectedContact
    let name = document.getElementById('edit-fullname').value;
    let email = document.getElementById('edit-email').value;
    let phone_number = document.getElementById('edit-phone').value;

	let tmp = {
		contact_id: contactId,
        name: name,
        email: email,
        phone_number: phone_number
	};

	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/update_contact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			// if readyState is 4 then the request is done, 200 means "OK"
			if (this.readyState == 4 && this.status === 200) 
			{
				let jsonObject = JSON.parse(xhr.responseText);

				console.log(jsonObject.message);

				alert("Successfully updated");
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log("error retrieving contacts from database");
	}

    // Update contact in the original contacts array
    //let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    //[contactIndex] = { fullname, email, phone };
    //localStorage.setItem('contacts', JSON.stringify(contacts));

	//alert('Contact updated successfully!');

    // Clear local storage
    //localStorage.removeItem('editContactIndex');
    //localStorage.removeItem('editContact');

    // Set a flag to activate the search tab after redirecting
    //localStorage.setItem('activeTab', 'search');

    // Redirect back to the dashboard
    //window.location.href = 'dashboard.html';
}


function saveCookie(id, name)
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "name=" + name + ",user_id=" + id + ";expires=" + date.toGMTString();
}

function readCookie()
{
	user_id = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "Name" )
		{
			Name = tokens[1];
		}
		if( tokens[0] == "user_id" )
		{
			user_id = parseInt( tokens[1].trim() );
		}
	}

	console.log(user_id);
	
	// if( user_id < 0 )
	// {
	// 	window.location.href = "index.html";
	// }
	// else
	// {		document.getElementById("userName").innerHTML = "Logged in as " + Name;
	// }
}

function doLogout()
{
	user_id = 0;
	Name = "";
	document.cookie = "Name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}



					/*
					if (contacts.length > 0) {
						contacts.forEach((contact, index) => {
							// Create a div to display each contact and a delete button
							const resultItem = document.createElement('div');
							resultItem.className = 'contact-details';
							resultItem.id = "contact-details";
							resultItem.style = "display: none;";
							/*
							resultItem.innerHTML = `
								<p>Name: ${contact.name}, Email: ${contact.email}, Phone: ${contact.phone_number}</p>
								<!-- Delete button added here -->
								<button onclick="deleteContact(${index})">Delete</button>
								<button onclick="editContact(${index})">Edit</button>

							`;
							
							resultItem.innerHTML = `
								<label for="edit-fullname">Full Name</label>
								<input type="text" id="edit-fullname" disabled>
								
								<label for="edit-email">Email</label>
								<input type="email" id="edit-email" disabled>
								
								<label for="edit-phone">Phone Number</label>
								<input type="tel" id="edit-phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxlength="12" disabled>

								<button class="edit" onclick="enableEditing()">Edit</button>
								<button class="delete" onclick="deleteContact()">Delete</button>
								<button class="save" onclick="saveContact()" style="display: none;">Save</button>
							`;
							resultsDiv.appendChild(resultItem);  // Add the contact to the results div
						});
					} else {
						resultsDiv.textContent = 'No contacts found.';
					}
*/
					
			