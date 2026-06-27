const postContainer = document.getElementsByClassName("common-container");
console.log(postContainer)
postContainer[0].addEventListener('click' ,(event)=>{
    window.location.href = "./boardView/boardView.html";
});