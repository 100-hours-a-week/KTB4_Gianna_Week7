const params = new URLSearchParams(window.location.search);
const postId = params.get("postId");

(async()=>{
    const cookie = await cookieStore.get('userId');
    const curUserId = cookie.value;
    try{
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
        await makePostViewHeader(data.data, curUserId)
        makePostViewContent(data.data);
    }catch(error){
        console.error('로그인 중 오류 발생:', error);
    }
})();

const makePostViewHeader = async (post, curUserId) =>{
        const title = document.createElement('h3');
        title.id = "title";
        title.textContent =post.title;

        const user = await getUser(curUserId);
        const profilePicture= document.createElement('img');
        profilePicture.src = '#';//user.profilePicture;
        profilePicture.id = "postProfilePicture";

        const author = document.createElement('h4');   
        author.id = "postAuthor";
        author.textContent = post.author;

        const date = document.createElement('h4');
        date.id = "postUploadDate";
        date.textContent = post.createdAt;

        const postHeaderDiv = document.getElementById('postHeader')
        postHeaderDiv.append(title, profilePicture, author, date)

        if(curUserId == post.userId){
            const updateBtn = document.createElement('button');
            updateBtn.id = "postUploadBtn";
            updateBtn.textContent = "수정";   
            updateBtn.addEventListener('click', ()=> window.location.href= `../boardWrite/boardWrite.html?postId=${post.postId}`);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.id = "postDeleteBtn";
            deleteBtn.textContent = "삭제"

            
            postHeaderDiv.append(updateBtn, deleteBtn)
        }        
}

const getUser = async(userId) =>{
    try{
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
        });

        if (!response.ok) {
            throw new Error('로그인 실패');
        }

        const data = await response.json();
        return data.data;
    }catch(error){
        console.error('로그인 중 오류 발생:', error);
    }
} 

const makePostViewContent = (post) =>{
    const content = document.createElement('h6');
    content.id = "postContent"
    content.textContent = post.content;

    const file = document.createElement('img');
    file.id = "postViewFile";
    file.src = '#' //post.file;

    const postContainerDiv = document.getElementById('postContainer');
    postContainerDiv.append(content, file)
}


