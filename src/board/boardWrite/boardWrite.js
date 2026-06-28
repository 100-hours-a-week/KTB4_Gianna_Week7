const titleInput = document.getElementById('postTitle')
const contentInput = document.getElementById('postContent')
const pictureInput = document.getElementById('postUploadedPicture')
const postWriteBtn = document.getElementById('postWriteBtn')

const curDate = new Date();

const postWriteEventHandler = async () => {
    const userIdCookie = await cookieStore.get('userId');
    const userId = userIdCookie.value
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

const postUpdateEventHandler = async () =>{
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("postId");

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

postWriteBtn.addEventListener('click', async (event)=>{
    if(postWriteBtn.textContent === "완료"){
        postWriteEventHandler();
    }else if(postWriteBtn.textContent === "수정하기"){
        postUpdateEventHandler();
    }
})

const setFormWithPostInfo = (post) => {
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

const updateForm = async (postId) => {
    try {
        const response = await fetch(`http://localhost:8080/posts/${postId}`, {
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
const postId = params.get("postId");
if (postId) {
    const postWriteTitle = document.getElementById('postWriteTitle');
    postWriteTitle.textContent = "게시글 수정"
    const postWriteBtn = document.getElementById('postWriteBtn');
    postWriteBtn.textContent = "수정하기"

    updateForm(postId);
}

