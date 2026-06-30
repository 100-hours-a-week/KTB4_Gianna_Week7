import { loadHeader } from "../../components/header/header.js";
import { getUser, getUserId, getPostId } from "../../module/module.js";

loadHeader();


const postId = getPostId();
const boardViewProcess = async()=>{
    const cookie = await getUserId();
    try{
        const response = await fetch(`http://localhost:8080/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('게시물 상세 조회 실패');
        }

        const data = await response.json();
        await makePostViewHeader(data.data, curUserId)
        makePostViewContent(data.data);
    }catch(error){
        console.error('boardView 오류 발생:', error);
    }
};

const makePostViewHeader = async (post, curUserId) =>{
        const title = document.createElement('h3');
        title.id = "title";
        title.textContent =post.title;

        const user = await getUser(curUserId);
        const profilePicture= document.createElement('img');
        profilePicture.src = user?.profilePicture || '';//user.profilePicture;
        profilePicture.id = "postProfilePicture";

        const author = document.createElement('h4');   
        author.id = "postAuthor";
        author.textContent = post.author;

        const date = document.createElement('h4');
        date.id = "postUploadDate";
        date.textContent = post.createdAt;

        const postHeaderDiv = document.getElementById('postHeader')
        const postHeaderMeta = document.createElement('div');
        postHeaderMeta.classList.add('post-header-meta');
        postHeaderMeta.append(profilePicture, author, date);
        postHeaderDiv.append(title, postHeaderMeta)

        if(curUserId == post.userId){
            const actionGroup = document.createElement('div');
            actionGroup.classList.add('post-action-group');

            const updateBtn = document.createElement('button');
            updateBtn.id = "postUploadBtn";
            updateBtn.textContent = "수정";   
            updateBtn.addEventListener('click', ()=> window.location.href= `../boardWrite/boardWrite.html?postId=${post.postId}`);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.id = "postDeleteBtn";
            deleteBtn.textContent = "삭제"

            
            actionGroup.append(updateBtn, deleteBtn);
            postHeaderDiv.append(actionGroup)
        }        
}



const makePostViewContent = (post) =>{
    const content = document.createElement('h6');
    content.id = "postContent"
    content.textContent = post.content;

    const file = document.createElement('img');
    file.id = "postViewFile";
    file.src = post.file || '' //post.file;

    const postContainerDiv = document.getElementById('postContainer');
    postContainerDiv.append(file, content)
}



boardViewProcess();

const postStatsLikeBtn = document.getElementById('postStatsLikeBtn')
let clickedLike = false;
function clickLikeBtn (){
    if(clickedLike){
        postStatsLikeBtn.style.backgroundColor = "#d9d9d9"
    }else if(!clickedLike){
        postStatsLikeBtn.style.backgroundColor = "#aca0eb"
    }
    clickedLike = !clickedLike;
}

postStatsLikeBtn.addEventListener('click', ()=>{
    clickLikeBtn();
})