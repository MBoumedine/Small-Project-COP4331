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