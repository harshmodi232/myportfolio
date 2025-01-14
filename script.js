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
