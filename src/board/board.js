import { loadHeader } from "../components/header/header.js";
import { formalizeDate } from "../module/module.js";

loadHeader();

const postList = [];
showPostList();

async function getPostList  () {
    try{
        const response = await fetch('http://localhost:8080/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
        });

        if (!response.ok) {
            throw new Error('로그인 실패');
        }

        const data = await response.json();
        data.data.postList.forEach(posts => {
            postList.push(posts);
        });
    } catch(error){
        console.error('로그인 중 오류 발생:', error);
    }
}

async function showPostList () {

    await getPostList();
    postList.forEach((post)=>{
        makePostView(post)
    })
   
   
}

const makePostView = (post) =>{
    const postListContainer = document.getElementById('post-list-container');
    const postDiv = document.createElement("article");
    postDiv.classList.add('post-card');
    makePostClickEventListener(postDiv, post.id)

    const postMain = document.createElement('div');
    postMain.classList.add('post-card-main');

    const title = document.createElement('h3');
    title.classList.add('post-card-title');
    title.textContent = post.title;
    postMain.append(title);

    const meta = document.createElement('div');
    meta.classList.add('post-card-meta');

    const stats = document.createElement('div');
    stats.classList.add('post-card-stats');

    const likes = document.createElement('span');
    likes.textContent = `좋아요 ${post.likes || 0}`;
    stats.append(likes);

    const commentCount = document.createElement('span');
    commentCount.textContent = `댓글 ${post.commentCount || 0}`;
    stats.append(commentCount);

    const views = document.createElement('span');
    views.textContent = `조회수 ${post.views || 0}`;
    stats.append(views);

    const date = document.createElement('span');
    date.classList.add('post-card-date');
    date.textContent = formalizeDate(post.createdAt);

    meta.append(stats, date);
    postMain.append(meta);

    const authorWrapper = document.createElement('div');
    authorWrapper.classList.add('post-card-author');

    const profile = document.createElement('div');
    profile.classList.add('post-card-profile');

    const author = document.createElement('span');
    author.textContent = post.author;
    authorWrapper.append(profile, author);

    postDiv.append(postMain, authorWrapper);

    postListContainer.appendChild(postDiv);
}

const makePostClickEventListener = (postDiv, postId)=>{
    postDiv.addEventListener('click' ,(event)=>{
        window.location.href = `./boardView/boardView.html?postId=${postId}`;
    }); 
}
