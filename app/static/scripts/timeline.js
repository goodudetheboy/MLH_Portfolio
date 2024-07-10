function initializeTimeline() {
  document.getElementById("timeline-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    fetch("/api/timeline_post", {
      method: "POST",
      body: formData
    })
      .then(response => {
        if (response.status == 200) {
          loadPosts();
          document.getElementById("timeline-form").reset();
        } else {
          alert("Error: " + data.message);
        }
      }
      );
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
        const gravatarUrl = "https://www.gravatar.com/avatar/";
        console.log(post);
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
                  <img src="${gravatarUrl}" alt="User Gravatar">
                  <div class="post-inner">
                    <p><strong>${post.name}</strong> (${post.email})</p>
                    <p class="post-content">${post.content}</p>
                    <div>
                      <small>${new Date(post.created_at).toLocaleString()}</small>
                      <span class="delete-text" onclick="deletePost(${post.id})">Delete</span>
                    <div>
                  </div>

              `;
        postsContainer.appendChild(postElement);
      });
    });
}

function deletePost(postId) {
  fetch(`/api/timeline_post/${postId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.status == 200) {
        loadPosts();
      } else {
        alert('Error: ' + data.message);
      }
    });
}
