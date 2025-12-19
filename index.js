import { postsData } from './data.js'

document.addEventListener('click', function(e) {
  if (e.target.dataset.like) {
    handleLikeFx(e.target.dataset.like)
  }
})

function handleLikeFx(postId) {
  const targetPostObj = postsData.find(post => post.uuid === postId)
  if (!targetPostObj) return

  if (targetPostObj.isLiked) {
    targetPostObj.likes--
  } else {
    targetPostObj.likes++
  }

  targetPostObj.isLiked = !targetPostObj.isLiked
  render()
}

function getPostsHtml() {
  let postsHtml = ''

  postsData.forEach(function(poster) {
    const {
      name,
      username,
      location,
      avatar,
      post,
      comment,
      likes,
      isLiked,
      uuid
    } = poster

    const heartClass = isLiked
      ? 'fa-solid fa-heart liked'
      : 'fa-regular fa-heart'

    postsHtml += `
      <div class="posts">
        <div class="posts-start">
          <img src="${avatar}" class="avatar-pic" alt="${name} avatar">
          <div class="post-header">
            <p class="name">${name}</p>
            <p class="location">${location}</p>
          </div>
        </div>

        <img src="${post}" class="post" alt="Post by ${username}">

        <div class="post-interaction">
          <span class="like-icons">
            <i class="${heartClass}" data-like="${uuid}"></i>
          </span>
          <span class="post-icons">
            <img src="images/icon-comment.png" class="icon-img" alt="Comment icon">
          </span>
          <span class="post-icons">
            <img src="images/icon-dm.png" class="icon-img" alt="Direct message icon">
          </span>
        </div>

        <div class="caption">
            <p class="bold like-count">
                ${likes} likes
            </p>
            <p class="bold">
                ${username}<span class="post-text"> ${comment}</span>
            </p>
        </div>

        <div class="gap"></div>
      </div>
    `
  })

  return postsHtml
}

function render() {
  document.getElementById('feed').innerHTML = getPostsHtml()
}

render()
