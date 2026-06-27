const signupBtn = document.getElementById('signup-btn');

const profilePictureInput = document.getElementById('profile-picture');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nicknameInput = document.getElementById('nickname');

signupBtn.addEventListener('click', async (event) => {
    
try{
        const response = await fetch('http://localhost:8080/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput.value,
                password: passwordInput.value,
                nickname: nicknameInput.value,
                profilePicture: profilePictureInput.files[0]
            })
        });

        if (!response.ok) {
            throw new Error('회원가입 실패');
        }

        const data = await response.json();
        console.log('회원가입 성공:', data);
        window.location.replace('../login/login.html');
    }catch(error){
        console.error('회원가입 중 오류 발생:', error);
    }
    
});