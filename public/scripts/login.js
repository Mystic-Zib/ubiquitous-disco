const submit = document.querySelector("#submit");

//redirect to sign up
const signUp = document.querySelector("#signUp");

//errors
const err = document.querySelector("#err");

//login
const loginForm = document.querySelector("form");

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let teamName = document.querySelector("#teamName");
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");

    fetch("http://localhost:3000/login",{
    method:"POST",
    headers:{
        "Content-type":"application/json",
    },
    body:JSON.stringify({
        teamName:teamName.value,
        username:username.value,
        password:password.value,
    })
})
.then(data=>data.json())
.then((result)=>{
    if(result!==null){
        if(result.redirect===undefined){
            console.log(result);
            err.textContent = result.err;
    
            loginForm.reset()
        }else{
            window.location.href=`http://localhost:3000/${result.redirect}`;
        }

    }
})
})

