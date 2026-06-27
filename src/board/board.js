getPostsList();

const postContainer = document.getElementsByClassName("common-container");

postContainer[0].addEventListener('click' ,(event)=>{
    window.location.href = "./boardView/boardView.html";
});

async function getPostsList  () {
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
        console.log(data.data)
    }catch(error){
        console.error('로그인 중 오류 발생:', error);
    }
}