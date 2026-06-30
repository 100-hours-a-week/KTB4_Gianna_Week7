import { loadHeader } from "../../components/header/header.js";
import { getUserId, getPostId } from "../../module/module.js";

const titleInput = document.getElementById('postTitle')
const contentInput = document.getElementById('postContent')
const pictureInput = document.getElementById('postUploadedPicture')
const helperText = document.getElementById('helperText');
const postWriteBtn = document.getElementById('postWriteBtn')

const curDate = new Date();


loadHeader();
checkPostStatus();


function changeButtonColorByCondition(){
    if(titleInput.value.length >= 1 && contentInput.value.length >=1){ 
        postWriteBtn.disabled = false;
        postWriteBtn.style.backgroundColor = "#7f6aee";
    }else {
        postWriteBtn.disabled = true;
        postWriteBtn.style.backgroundColor = "#aca0eb"
    }
}

function checkPostStatus(){
    if(titleInput.value.length === 0 || contentInput.value.length === 0 ){
        helperText.textContent = "*제목, 내용을 모두 작성해주세요."
    }else{
        helperText.textContent=""
    }
}
titleInput.addEventListener('input', ()=>{ 
    changeButtonColorByCondition();
    checkPostStatus();
})

contentInput.addEventListener('input', ()=>{ 
   changeButtonColorByCondition();
   checkPostStatus();
})

async function postWriteEventHandler() {
    const userId = getUserId();

    try{
        const response = await fetch(`http://localhost:8080/posts/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title : titleInput.value,
                content : contentInput.value,
                date : curDate,
                file : pictureInput.value.length ===0 ? null : pictureInput.value
            })
        });

        if (!response.ok) {
            throw new Error('로그인 실패');
        }

        const data = await response.json();
        window.location.replace('../board.html');

    }catch(error){
        console.error('로그인 중 오류 발생:', error);
    }
}

async function postUpdateEventHandler(){
    const postId = getPostId();

    try{
        const response = await fetch(`http://localhost:8080/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title : titleInput.value,
                content : contentInput.value,
                file : pictureInput.value.length ===0 ? null : pictureInput.value
            })
        });

        if (!response.ok) {
            throw new Error('로그인 실패');
        }

        window.location.replace(`../boardView/boardView.html?postId=${postId}`);

    }catch(error){
        console.error('로그인 중 오류 발생:', error);
    }
}


//실제 버튼 이벤트 리스너
postWriteBtn.addEventListener('click', async (event)=>{
    if(postWriteBtn.textContent === "완료"){
        postWriteEventHandler();
    }else if(postWriteBtn.textContent === "수정하기"){
        postUpdateEventHandler();
    }
})

//수정할 때 화면 설정
async function setFormWithPostInfo(post){
    console.log(post)
    const postTitle = document.getElementById('postTitle');
    postTitle.value = post.title;

    const postContent = document.getElementById('postContent');
    postContent.textContent = post.content;
    
    const postWriteContainerDiv = document.querySelector('.post-write-container');
    const postProfilePicture = document.getElementById('postProfilePicture')
    const imgFileName = document.createElement('span');
    imgFileName.id = 'curFileName';
    imgFileName.value = post.file;
    postWriteContainerDiv.append(imgFileName)
}

async function updateForm(postIdFromURL) {
    try {
        const response = await fetch(`http://localhost:8080/posts/${postIdFromURL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },                
        });

        if (!response.ok) {
            throw new Error('로그인 실패');
        }

        const data = await response.json();
        setFormWithPostInfo(data.data);
    } catch(error){
        console.error('로그인 중 오류 발생:', error);
    }
}

const params = new URLSearchParams(window.location.search);
const postIdFromURL = params.get("postId");
if (postIdFromURL) {
    const postWriteTitle = document.getElementById('postWriteTitle');
    postWriteTitle.textContent = "게시글 수정"
    const postWriteBtn = document.getElementById('postWriteBtn');
    postWriteBtn.textContent = "수정하기"

    updateForm(postIdFromURL);
}
