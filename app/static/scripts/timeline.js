function initializeTimeline() {
  console.log(document);

  document.getElementById("fuck").innerHTML = "Fuck"

  document.getElementById("timeline-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch("/api/timeline_post", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          loadPosts();
          document.getElementById("timeline-form").reset();
        } else {
          alert("Error: " + data.message);
        }
      });
  });

  loadPosts();
}
function loadPosts() {
  fetch("/api/timeline_post")
    .then(response => response.json())
    .then(data => {
      const postsContainer = document.getElementById("posts-container");
      postsContainer.innerHTML = "";

      data.timeline_posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      console.log(data);

      data.timeline_posts.forEach(post => {
        const gravatarUrl = "https://www.gravatar.com/avatar/" + md5(post.email.trim().toLowerCase());
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
                  <img src="${gravatarUrl}" alt="User Gravatar">
                  <p><strong>${post.name}</strong> (${post.email})</p>
                  <p>${post.content}</p>
                  <small>${new Date(post.created_at).toLocaleString()}</small>
              `;
        postsContainer.appendChild(postElement);
      });
    });
}
