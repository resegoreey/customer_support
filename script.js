// Helper function to get current time in hh:mm format
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  // Display bot welcome message on page load
  const botWelcome = document.createElement("div");
  botWelcome.classList.add("bubble", "bot");
  botWelcome.innerText =
    "Hi there! 👋 I'm Ree, your support assistant. How can I help you today?";
  chatBox.appendChild(botWelcome);
  chatBox.scrollTop = chatBox.scrollHeight;

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload

    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Create and display user's bubble
    const userBubble = document.createElement("div");
    userBubble.classList.add("bubble", "user");
    userBubble.innerText = userMessage;
    const userTime = document.createElement("div");
    userTime.classList.add("timestamp");
    userTime.innerText = getCurrentTime();
    chatBox.appendChild(userTime);
    chatBox.appendChild(userBubble);

    

    input.value = ""; // Clear input
    chatBox.scrollTop = chatBox.scrollHeight;

    // Add typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("bubble", "bot");
    typingIndicator.innerText = "Ree is typing...";
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      const botReply = data.response;

      chatBox.removeChild(typingIndicator);

      // Create and display bot's bubble
      const botBubble = document.createElement("div");
      botBubble.classList.add("bubble", "bot");
      botBubble.innerText = botReply;
      const botTime = document.createElement("div");
      botTime.classList.add("timestamp");
      botTime.innerText = getCurrentTime();
      chatBox.appendChild(botTime);
      chatBox.appendChild(botBubble);

      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      console.error("Error communicating with server:", error);
    }
  });
});
