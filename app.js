/*
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Expected behaviour

- First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
- Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
- A confirmation modal should pop up before a comment or reply is deleted.
- Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.
- You can only edit or delete your own comments and replies.

*/

const data = [
  {
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "1 month ago",
    score: 12,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp",
      },
      username: "amyrobson",
    },
    replies: [],
  },
  {
    id: 2,
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: "2 weeks ago",
    score: 5,
    user: {
      image: {
        png: "./images/avatars/image-maxblagun.png",
        webp: "./images/avatars/image-maxblagun.webp",
      },
      username: "maxblagun",
    },
    replies: [
      {
        id: 3,
        content:
          "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        createdAt: "1 week ago",
        score: 4,
        replyingTo: "maxblagun",
        user: {
          image: {
            png: "./images/avatars/image-ramsesmiron.png",
            webp: "./images/avatars/image-ramsesmiron.webp",
          },
          username: "ramsesmiron",
        },
      },
      {
        id: 4,
        content:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        createdAt: "2 days ago",
        score: 2,
        replyingTo: "ramsesmiron",
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
      },
    ],
  },
];

const currentUser = {
  image: {
    png: "./images/avatars/image-juliusomo.png",
    webp: "./images/avatars/image-juliusomo.webp",
  },
  username: "juliusomo",
};

const container = document.querySelector(".container");
const modalContainer = document.querySelector(".modal-container");
const replyContainers = document.querySelectorAll(".reply-container");
const commentContainer = document.querySelector(
  ".user-comment-with-update-btn"
);
const scoreContainers = document.querySelectorAll(".score-container");
const scoreContainer = document.querySelector(".score-container");
const dynamicScore = document.querySelector(".score");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");

const overlay = document.querySelector(".overlay");

let content = data[1].content;
let image = data[1].user.image.png;
let username = data[1].username;
let createdAt = data[1].createdAt;
let score = data[1].score;
let currentUserAvatar = currentUser.image.png;

let commentBeginDate = new Date("1 June 2024").getTime();
let now = new Date().getTime();

let daysAgo = Math.floor(((commentBeginDate - now) * -1) / 86400000);
let monthsAgo = Math.floor(((commentBeginDate - now) * -1) / 2628002880);
//there are 86400000 ms in 1 day
//and roughly 2628002880 ms in 1 month
let scoreNumber = 0;

console.log(commentBeginDate);
console.log(now);
console.log(daysAgo);
console.log(monthsAgo);
console.log(Math.floor(daysAgo / 7));
console.log(Math.floor(daysAgo / 28) + " " + "months ago");
console.log();

//FUNCTIONS
const formatTimestamp = () => {
  if (daysAgo >= 7) {
    Math.floor(daysAgo / 7);
  }
  if (daysAgo >= 28) {
    Math.floor(daysAgo / 28) + " " + "months ago";
  }
};

const createCommentContainer = (image, text) => {
  let div = document.createElement("div");
  div.setAttribute("class", "add-comment-container");
  div.innerHTML += `<img
          src=${currentUserAvatar}
          alt=""
          class="avatar add-comment-avatar"
        />

        <textarea
          class="comment-input"
          name=""
          id="comment-input"
          rows="3"
          placeholder="Add a comment..."
        ></textarea>

        <button class="blue-btn send-btn">Send</button>`;
  return div;
};

/* MAYBE I DON'T NEED THIS ONE ??
const addReply = (image, username, content, createdAt, score) => {
  let div = document.createElement("div");
  div.setAttribute("class", "first-level-comment");
  div.innerHTML += `
          <div class="score-container">
            <img src="images/icon-plus.svg" alt="" class="plus" />
            <div class="score">${score}</div>
            <img src="images/icon-minus.svg" alt="" class="minus" />
          </div>
          <div class="avatar-container">
            <img
              src=${image}
              alt=""
              class="avatar"
            />
            <div class="avatar-name">${username}</div>
            <div class="time-stamp">${createdAt}</div>
          </div>
          <div class="reply-container">
            <img src="images/icon-reply.svg" alt="" class="arrow" />
            <p class="reply">Reply</p>
          </div>
          <div class="comment">
            ${content}
          </div>
        `;
  return div;
};
*/

const createUserCommentWithUpdateBtn = (
  image,
  username,
  content,
  createdAt,
  score
) => {
  let div = document.createElement("div");
  div.setAttribute("class", "user-comment-wrapper");
  div.innerHTML += `<div class="user-comment-with-update-btn">
          <div class="user-comment">
            <div class="score-container">
              <img src="images/icon-plus.svg" alt="" class="plus" />
              <div class="score">${score}</div>
              <img src="images/icon-minus.svg" alt="" class="minus" />
            </div>
            <div class="user-avatar-container">
              <img
                src="${currentUserAvatar}"
                alt=""
                class="avatar"
              />
              <div class="avatar-name">${currentUser.username}</div>
              <p class="you">you</p>
              <div class="time-stamp">${daysAgo} days ago</div>
            </div>
             <div class="btns-wrapper">
              <div class="delete-edit-container">
                <div class="delete-container">
                  <img src="images/icon-delete.svg" alt="" class="arrow" />
                  <p class="delete">Delete</p>
                </div>
                <div class="edit-container">
                  <img src="images/icon-edit.svg" alt="" class="arrow" />
                  <p class="edit">Edit</p>
                </div>
              </div>
              <div class="reply-container">
                <img src="images/icon-reply.svg" alt="" class="arrow" />
                <p class="reply">Reply</p>
              </div>
            </div>
            <div class="comment">
              <p>
                <span class="at-title">@${currentUser.username} </span>${content}
              </p>
            </div>
          </div>
          <button class="blue-btn update-btn">Update</button>
        </div>`;

  return div;
};

//EVENT LISTENERS

//of course these only work for the first score-container
plusBtn.addEventListener("click", () => {
  scoreNumber++;
  dynamicScore.textContent = scoreNumber;
});

minusBtn.addEventListener("click", () => {
  scoreNumber--;
  dynamicScore.textContent = scoreNumber;

  if (scoreNumber <= 0) {
    dynamicScore.textContent = "0";
  }
});

//scoreContainers.forEach((scoreContainer) => {
/*scoreContainer.addEventListener("click", (e) => {
  let plusClicked = e.target.classList.contains("plus");
  let minusClicked = e.target.classList.contains("minus");

  let scoreNumber = 0;

  if (plusClicked) {
    scoreNumber++;
    dynamicScore.textContent = scoreNumber;
  }
  if (minusClicked) {
    scoreNumber--;
    dynamicScore.textContent = scoreNumber;
    if (scoreNumber <= 0) {
      dynamicScore.textContent = "0";
    }
  }
});
//});
*/

container.addEventListener("click", (e) => {
  let replyClicked = e.target.classList.contains("reply");
  let sendClicked = e.target.classList.contains("send-btn");
  let closestComment = e.target.closest(".main-comment-container");

  let updateBtnClicked = e.target.classList.contains("update-btn");
  let deleteClicked = e.target.classList.contains("delete");
  let editClicked = e.target.classList.contains("edit");

  let yesDeleteClicked = e.target.classList.contains("yes-delete-btn");
  let noCancelClicked = e.target.classList.contains("no-cancel-btn");

  if (replyClicked) {
    closestComment.appendChild(createCommentContainer(image));
  }

  if (sendClicked) {
    const addCommentContainer = e.target.closest(".add-comment-container");
    //console.log(addCommentContainer);
    let content = addCommentContainer.children[1].value;

    if (addCommentContainer.children[1]) {
      //if there is something
      //typed into the placeholder/text
      closestComment.appendChild(
        createUserCommentWithUpdateBtn(
          image,
          username,
          content,
          createdAt,
          score
        )
      );
      addCommentContainer.remove();
    }
  }

  if (deleteClicked) {
    modalContainer.style.visibility = "visible";
    document.body.scrollIntoView();
    overlay.style.display = "block";
  }

  if (editClicked) {
    console.log("edit has been clicked");
    //the input/textarea should become live so that we can type on it
    // BUT HOW TO DO THAT?
    //we want what we had BEFORE we hit the send btn
  }

  if (yesDeleteClicked) {
    const userCommentWithUpdateBtn = document.querySelector(
      ".user-comment-with-update-btn"
    );
    modalContainer.style.visibility = "hidden";
    overlay.style.display = "none";
    userCommentWithUpdateBtn.remove();
  }

  if (updateBtnClicked) {
    //I guess this removes the delete, edit and update btns?
    const deleteEditContainer = document.querySelector(
      ".delete-edit-container"
    );
    const updateBtn = document.querySelector(".update-btn");
    deleteEditContainer.remove();
    updateBtn.remove();
    //but I think we must put a reply button here
    const replyContainer = document.querySelector(
      ".user-comment-with-update-btn .reply-container"
    );
    replyContainer.style.visibility = "visible";
  }

  if (noCancelClicked) {
    modalContainer.style.visibility = "hidden";
    overlay.style.display = "none";
  }
});
