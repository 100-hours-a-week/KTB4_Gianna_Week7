const postCommentBtn = document.getElementById('postCommentBtn');


postCommentBtn.addEventListener('click', async (event)=>{

    if(postCommentBtn.textContent === "댓글 등록"){
        postCommentEventListener();
    } else if(postCommentBtn.textContent === "댓글 수정"){
        updateCommentEventListener(event);
    }   
})

const updateCommentEventListener = async(event) =>{
    const cookie = await cookieStore.get('curUpdateCommentId');
    const commentId = cookie.value;
    const newContent = document.getElementById('commentContentEnter');
    try{
        const response = await fetch(`http://localhost:8080/posts/${postId}/comments/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: newContent.value,
            })
        });

        if (!response.ok) {
            throw new Error('댓글 수정 실패');
        }

        document.cookie = `curUpdateCommentId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"`;
        location.reload();
    }catch(error){
        console.error('댓글 작성 중 오류 발생:', error);
    }
}

const postCommentEventListener = async () =>{
    const cookie = await cookieStore.get('userId');
    const curUserId = cookie.value;
    const commentContentEnter = document.getElementById('commentContentEnter');

    try{
        const response = await fetch(`http://localhost:8080/posts/${postId}/comments/${curUserId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: commentContentEnter.value,
                createdAt : new Date()
            })
        });

        if (!response.ok) {
            throw new Error('댓글 작성 실패');
        }

        const data = await response.json();
        location.reload();
    }catch(error){
        console.error('댓글 작성 중 오류 발생:', error);
    }
}

const getCommentList = async (postId) => {
    const cookie = await cookieStore.get('userId');
    const curUserId = cookie.value;
    try{
        const response = await fetch(`http://localhost:8080/posts/${postId}/comments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
        });

        if (!response.ok) {
            throw new Error('로그인 실패');
        }

        const data = await response.json();
        data.data.commentsList.forEach(async (comment) => {
            await makeCommentView(comment, curUserId)
        });
    }catch(error){
        console.error('로그인 중 오류 발생:', error);
    }
}

getCommentList(postId);

const makeCommentView = async (comment, curUserId) =>{
    const user= await getUser(curUserId);
    const author = document.createElement('h5');
    author.classList.add("comment-author-text");
    author.textContent = comment.author;

    const date = document.createElement('h6');
    date.classList.add('comment-date-text');
    date.textContent = comment.createdAt;

    const content = document.createElement('h6');
    content.classList.add('comment-content-text');
    content.textContent = comment.content;

    const commentListContainer = document.getElementById('commentListContainer')
    commentListContainer.append(author, date, content)
    
    if(curUserId == comment.userId) {
        const updateBtn = document.createElement('button');
            updateBtn.id = "postUploadBtn";
            updateBtn.textContent = "수정";   
            updateBtn.onclick = () => requestUpdateComment(comment.id, comment.content);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.id = "postDeleteBtn";
            deleteBtn.textContent = "삭제"
            deleteBtn.addEventListener('click', await requestDeleteComment(event, comment.id))
            deleteBtn.onclick = ()=>{location.reload()};

        commentListContainer.append(updateBtn, deleteBtn) 
    }
}

const requestDeleteComment = async (event, commentId) => {
     try{
        const response = await fetch(`http://localhost:8080/posts/${postId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            
        });

        if (!response.ok) {
            throw new Error('로그인 실패');
        }
        
    }catch(error){
        console.error('로그인 중 오류 발생:', error);
    }
}

const requestUpdateComment = (commentId, content) =>{
    const commentContentEnter = document.getElementById('commentContentEnter');
    commentContentEnter.textContent = content;
    const commentUpdateBtn = document.getElementById('postCommentBtn');
    commentUpdateBtn.textContent = '댓글 수정'
    document.cookie = `curUpdateCommentId = ${commentId};`
}

