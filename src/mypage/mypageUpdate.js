import { loadHeader } from "../components/header/header.js";
import { getUser, getUserId } from "../module/module.js";
import { nicknameHelperTextMaker } from "../utils/helperTextMaker.js";

loadHeader();

const userId = await getUserId();
const user = await getUser(userId);

const setForm = (user) =>{
    const newProfilePicture = document.getElementById('newProfilePicture');
    newProfilePicture.file = user?.file;

    const emailDesc = document.getElementById('emailDesc');
    emailDesc.textContent = user.email;

    const nicknameText = document.getElementById('nicknameText');
    nicknameText.value = user.nickname;

}

setForm(user);

const nicknameText = document.getElementById('nicknameText');
const nicknameHelperText = document.getElementById('nicknameHelperText')



nicknameText.addEventListener('input', ()=>{
    const helperText = nicknameHelperTextMaker(nicknameText.value);
    nicknameHelperText.textContent = helperText;

})

const updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click', async ()=>{
    const newProfilePicture = document.getElementById('newProfilePicture').value;
    const newNickname = document.getElementById('nicknameText').value;

    if(newProfilePicture !== user.profilePicture){

    }
    if(newNickname !== user.nickname){
        try{
            const response = await fetch(`http://localhost:8080/users/${userId}/nickname`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    nickname:newNickname
                })
                
            });

            if (!response.ok) {
                throw new Error('닉네임 수정 실패');
            }

            const data = await response.json();
            if(!data.data){
            const existingToastMsg = document.getElementById('pwdUpdateSuccessToastMsg');
            if (existingToastMsg) {
                existingToastMsg.remove();
            }

            const toastMsg = document.createElement('h5');
            toastMsg.classList.add("toastMsg");
            toastMsg.id = "pwdUpdateSuccessToastMsg"
            toastMsg.textContent ="수정완료";

            const updateContainer = document.getElementById('updateContainer');
            updateContainer.append(toastMsg)
            setTimeout(()=>{window.location.replace('/src/board/board.html')}, 3000)
        }
        } catch(error){
            console.error('오류 발생:', error);
        }
    }  
})


const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', async ()=>{
    if(window.confirm('회원탈퇴 하시겠습니까?')){
        try{
            const response = await fetch(`http://localhost:8080/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }, 
            });

            if (!response.ok) {
                throw new Error('닉네임 수정 실패');
            }

            window.location.reload('/src/login/login.html')
        } catch(error){
            console.error('오류 발생:', error);
        }
    }
})