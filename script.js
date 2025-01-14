const roles = ['Full Stack Developer', 'Data Analyst', 'Software Developer'];
let roleIndex = 0;
const roleElement = document.getElementById('role');

function changeRole() {
    // Add the fade-out and scale-down animations
    roleElement.classList.add('fade-out', 'scale-down');
    
    // After the fade-out animation ends, change the role and apply fade-in and scale-up animations
    setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleElement.textContent = roles[roleIndex];
        roleElement.classList.remove('fade-out', 'scale-down');
        roleElement.classList.add('fade-in', 'scale-up');
    }, 500);  // Wait for the fade-out and scale-down to complete before changing the text
}

// Change role every 2 seconds
setInterval(changeRole, 2000);


document.getElementById('menuToggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('navList').classList.toggle('active');
});

// JavaScript to toggle the navigation menu
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');

// Toggle the menu when the hamburger icon is clicked
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('open'); // Toggle the 'open' class for showing/hiding menu
    menuToggle.classList.toggle('open'); // Toggle the 'open' class for the hamburger icon
});

// Automatically close the menu when any menu item is clicked
const navLinks = document.querySelectorAll('#navList a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('open'); // Remove 'open' class to hide the menu
        menuToggle.classList.remove('open'); // Reset hamburger icon to default state
    });
});

