let chats = document.getElementById("chats");
let no_chats_text = document.getElementById("no-chats-text");
let error_parent = document.getElementById("error-parent");
let error = document.getElementById("error");

const BASE_API_URL = "http://localhost:4000/";

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("see-more")) {
    const fullText = decodeURIComponent(e.target.dataset.full);
    const textEl = e.target.previousElementSibling;

    textEl.textContent = fullText;
    e.target.remove();
  }
});

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
    console.log(data.data);

    const MAX_LENGTH = 300;

    data.data.reverse().forEach((chat) => {
      const div = document.createElement("div");
      const isLong = chat.aiResponse.length > MAX_LENGTH;
      div.innerHTML = `
      <p><strong>INPUT:</strong> ${chat.input}</p>
  <p><strong>INSTRUCTIONS:</strong> ${chat.instructions}</p>
  <p>
    <strong>AI Bot:</strong>
    <span class="ai-text">
      ${isLong ? chat.aiResponse.slice(0, MAX_LENGTH) + "..." : chat.aiResponse}
    </span>
    ${
      isLong
        ? `<span class="see-more" data-full="${encodeURIComponent(
            chat.aiResponse
          )}"> See more</span>`
        : ""
    }
  </p>
       `;
      div.classList.add("chat");
      chats.appendChild(div);
    });
  } catch (err) {
    error_parent.style.display = "flex";

    error.textContent = err;
  }
})();
