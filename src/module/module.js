export const getPostId = () =>{
    const params = new URLSearchParams(window.location.search);
    return params.get("postId");
}

export const getuUserId = async () =>{
    const cookie = await cookieStore.get('userId');
    return cookie.value;
}

export const getUser = async(userId) =>{
    try{
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
        });

        if (!response.ok) {
            throw new Error('사용자 정보 조회 실패');
        }

        const data = await response.json();
        return data.data;
    }catch(error){
        console.error('오류 발생:', error);
    }
} 