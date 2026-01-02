let chats = document.getElementById("chats");
let no_chats_text = document.getElementById("no-chats-text");
let error_parent = document.getElementById("error-parent");
let error = document.getElementById("error");

const BASE_API_URL = "http://localhost:4000/";

// Fetch Chats
const fetchChats = (async () => {
  try {
    let res = await fetch(` http://localhost:4000/api/v1/chat/chats`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    if (!data.data) {
      no_chats_text.style.display = "flex";
    }
    data.data.reverse().forEach((chat) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>INPUT</strong>: ${chat.input}</p>
        <p><strong>INSTRUCTIONS:</strong> ${chat.instructions}</p>
       `;
      div.classList.add("chat");
      chats.appendChild(div);
    });
  } catch (err) {
    error_parent.style.display = "flex";

    error.textContent = err;
  }
})();
