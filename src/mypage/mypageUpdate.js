import { loadHeader } from "../components/header/header.js";
import { getUser, getUserId } from "../module/module.js";

loadHeader();

const userId = await getUserId();
const user = await getUser(userId);

const setForm = (user) =>{
    const newProfilePicture = document.getElementById('newProfilePicture');
    newProfilePicture.file = user.file;

    const emailDesc = document.getElementById('emailDesc');
    emailDesc.textContent = user.email;

    const nicknameText = document.getElementById('nicknameText');
    nicknameText.value = user.nickname;

}

setForm(user);

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
            console.log(data.data)
        } catch(error){
            console.error('오류 발생:', error);
        }
    }
    
})