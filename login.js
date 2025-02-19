const API_URL = 'https://script.google.com/macros/s/AKfycbyTksuWLtrFlt-XFqUHFG0uxSsD8l764VwlqZ3RnEJ0LVPsOktKj2IbQ0WpUhKMVjpx/exec';

// Get the login form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission

    console.log("Form elements:", loginForm.elements);

    // Create FormData object from the form
    const formData = new FormData(loginForm);
    formData.append("action", "login");
    formData.append("loginEmail", loginForm.elements["loginEmail"].value);
    formData.append("loginPassword", loginForm.elements["loginPassword"].value);


    // Debugging: Log the form data being sent
    console.log("Form data being sent:");
    for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }

    // Send the request to Google Apps Script
    fetch(API_URL, {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log("Server response:", data); // Debugging
    
        if (data.result === "success") {
          alert("Login successful!");
          localStorage.setItem("username", data.username);  // Store username
          window.location.href = "index.html";  // Redirect to homepage
        } else {
          alert("Error: " + data.error);  // Show error message
        }
      })
      .catch(error => {
        console.error("Error during login:", error);
      });    
});