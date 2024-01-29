const signUp = document.querySelector("#sign_up");
const login = document.querySelector("#login");

signUp.addEventListener("click",()=>{
    window.location.href=`http://localhost:3000/signup`;
});

login.addEventListener("click",()=>{
    window.location.href=`http://localhost:3000/login`;
});