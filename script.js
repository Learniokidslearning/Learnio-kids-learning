// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact form message
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for contacting Learniokidslearning! We will reply soon.');
    this.reset();
});
// Save user data in the browser (demo only)
function signupUser(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("learnioUser", JSON.stringify(user));

    alert("Account created successfully!");
    window.location.href = "login.html";
}

// Login using saved data
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("learnioUser"));

    if (
        savedUser &&
        email === savedUser.email &&
        password === savedUser.password
    ) {
        alert("Login successful! Welcome, " + savedUser.name + "!");
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password.");
    }
}
