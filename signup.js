const API_URL = 'https://script.google.com/macros/s/AKfycbyTksuWLtrFlt-XFqUHFG0uxSsD8l764VwlqZ3RnEJ0LVPsOktKj2IbQ0WpUhKMVjpx/exec';

const form = document.forms['signupForm'];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const firstName = formData.get("First Name");
  const lastName = formData.get("Last Name");
  const username = formData.get("Username");
  const email = formData.get("Email");
  const password = formData.get("Password");
  const updates = document.getElementById("updates").checked ? "Yes" : "No";

  console.log(firstName, lastName, username, email, password, updates);

  localStorage.setItem("userEmail", email);

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      action: "signup",
      FirstName: firstName,
      LastName: lastName,
      Username: username,
      Email: email,
      Password: password,
      Updates: updates
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === "success") {
      alert("Signup successful! A verification code has been sent to your email.");
      window.location.href = "verification.html";
    } else {
      alert("Signup failed: " + data.error);
    }
  })
  .catch(error => console.error("Error!", error.message));
});