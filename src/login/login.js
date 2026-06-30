const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('loginBtn');

const emailHelperText = document.getElementById('emailHelperText');
const pwdHelperText = document.getElementById('pwdHelperText');

const initializeLoginHelperText = () => {
    emailHelperText.textContent='';
    pwdHelperText.textContent='';
}

const emailInput = document.getElementById('email');
const validateEmailInput = (emailInput) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailInput.length === 0) {
        loginBtn.style.backgroundColor="#aca0eb"
        emailHelperText.textContent= "*이메일을 입력해주세요."
        return;
    } else if(!emailRegex.test(emailInput)){
        loginBtn.style.backgroundColor="#aca0eb"
        emailHelperText.textContent = "*올바른 이메일 주소 형식을 입력해주세요. (예: example@adapterz.kr)"
        return;
    }

    emailHelperText.textContent='';
    if(emailHelperText.value === "" && pwdHelperText.value === "") {loginBtn.style.backgroundColor="#7f6aee"};

}

emailInput.addEventListener('input', ()=>{
    validateEmailInput(emailInput.value);
})

const pwdInput = document.getElementById('password');
const validatePwdInput = (pwdInput)=>{
    const passwordRegex =  /^(?=\S{8,20}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/;
    if(pwdInput.length ===0){
        loginBtn.style.backgroundColor="#aca0eb"
        pwdHelperText.textContent = "*비밀번호를 입력해주세요."
        return;
    } else if(!passwordRegex.test(pwdInput)){
        loginBtn.style.backgroundColor="#aca0eb"
        pwdHelperText.textContent = "비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다."
        return;
    }
    
    pwdHelperText.textContent='';
    if(emailHelperText.textContent === "" && pwdHelperText.textContent === "") {loginBtn.style.backgroundColor="#7f6aee"};
}
pwdInput.addEventListener(('input'), ()=>{
    validatePwdInput(pwdInput.value);
})

initializeLoginHelperText();
loginBtn.addEventListener('click', async (event) => {
    const emailInput = document.getElementById('email').value;
    const pwdInput = document.getElementById('password').value;
     
    validateEmailInput(emailInput);
    validatePwdInput(pwdInput);
    
    try{
        const response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput,
                password: pwdInput
            })
        });

        if (!response.ok) {
            throw new Error('로그인 실패');
        }

        const data = await response.json();
        document.cookie = `userId = ${data.data.id}; Path=/`
        localStorage.setItem("profilePicture", data.data.profilePicture);
        window.location.href = '../board/board.html';
    }catch(error){
        console.error('로그인 중 오류 발생:', error);
    }
});

