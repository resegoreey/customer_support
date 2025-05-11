// This function handles sending the user's message to the backend
function sendMessage(event) {
  event.preventDefault(); // Stop the form from reloading the page

  const userInput = document.getElementById("user-input").value;

  // Send message to backend using fetch
  fetch("http://127.0.0.1:5000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      const botResponse = data.response;

      // Append both messages to chat box
      document.getElementById("chat-box").innerHTML += `
            <div class="user"><strong>You:</strong> <p>${userInput}</p></div>
            <div class="bot"><strong>Ree:</strong> <p>${botResponse}</p></div>
        `;

      // Clear the input box
      document.getElementById("user-input").value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Attach the function to form submission
document.getElementById("chat-form").addEventListener("submit", sendMessage);
