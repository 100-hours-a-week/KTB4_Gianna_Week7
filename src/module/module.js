export const getPostId = () =>{
    const params = new URLSearchParams(window.location.search);
    return params.get("postId");
}

export const getUserId = async () =>{
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

export const formalizeDate = (datetime) =>{
    const [date, time] = datetime.split("T");
    const [hourMinSec, milliSec] = time.split(".");
    return `${date} ${hourMinSec}`;
}

const formalizeLikeViewComments = (value)=>{
    if(value < 1000){ 
        return value;
    }else{
        return `${Math.floor(value/1000)}k`
    }

}