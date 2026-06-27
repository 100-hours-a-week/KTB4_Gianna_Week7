const titleInput = document.getElementById('postTitle')
const contentInput = document.getElementById('postContent')
const pictureInput = document.getElementById('postUploadedPicture')
const postWriteBtn = document.getElementById('postWriteBtn')

const curDate = new Date();

postWriteBtn.addEventListener('click', async (event)=>{
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

        window.location.replace('../board/board.html');

    }catch(error){
        console.error('로그인 중 오류 발생:', error);
    }
})
