document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const uploadButton = document.getElementById("uploadButton");

    // Handle login button click
    loginButton.addEventListener("click", () => {
        const employeeId = document.getElementById("employeeId").value;
        const password = document.getElementById("password").value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ employeeId, password })
        })
        .then(response => response.json())
        .then(data => {
            const loginMessage = document.getElementById("loginMessage");
            if (data.success) {
                loginMessage.textContent = `Logged in successfully! Project Name: ${data.projectName}`;
                document.getElementById("login-section").style.display = 'none';
                document.getElementById("course-section").style.display = 'block';
            } else {
                loginMessage.textContent = data.message;
            }
        });
    });

    // Handle certificate upload button click
    uploadButton.addEventListener("click", () => {
        const employeeId = document.getElementById("employeeId").value; // Use the same ID used to log in
        const certificate = document.getElementById("certificate").value;

        fetch('/upload-certificate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ employeeId, certificate })
        })
        .then(response => response.json())
        .then(data => {
            const uploadMessage = document.getElementById("uploadMessage");
            uploadMessage.textContent = data.message;
        });
    });
});
