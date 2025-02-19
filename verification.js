function showEmailText() {
    //g ets the variables
    const emailText = localStorage.getItem("userEmail");
    const firstLetterIndex = 0;
    let lastLetterIndex = 0;

    // finds the part of the email to encode
    for (let i=0; i < emailText.length; i++) {
        if (emailText[i] === "@") {
            break;
        } else {
            lastLetterIndex = i;
        }

    }

    // encodes the email
    let encodedEmailText = ""

    for (let i = 0; i < emailText.length; i++) {
        if (i != firstLetterIndex && i != lastLetterIndex && i < lastLetterIndex) {
            encodedEmailText = encodedEmailText + "*";
        }  else {
            encodedEmailText = encodedEmailText + emailText[i];
        }
    }

    // changes the text shown on screen
    document.querySelector(".codeinfo strong").innerHTML = encodedEmailText
}

//calls the function to change the text
showEmailText();

const API_URL = 'https://script.google.com/macros/s/AKfycbyTksuWLtrFlt-XFqUHFG0uxSsD8l764VwlqZ3RnEJ0LVPsOktKj2IbQ0WpUhKMVjpx/exec';

const form = document.forms["verificationForm"];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const email = localStorage.getItem("userEmail"); // Get stored email
  const verificationCode = formData.get("verificationCode"); // Get the entered code


  if (!email || !verificationCode) {
    alert("Please enter the verification code.");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      action: "verifyCode",
      Email: email,
      VerificationCode: verificationCode
    }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" } // ✅ Use form data encoding
  })  
    .then(response => response.json())
    .then(data => {
      if (data.result === "success") {
        alert("Verification successful! Redirecting to login...");
        window.location.href = "login.html"; // Redirect to login page
      } else {
        alert("Verification failed: " + data.error);
      }
    })
    .catch(error => console.error("Error!", error.message));
});
