const eyes = document.querySelectorAll(".eye");
const anchor = document.querySelector("#anchor");
const rekt = anchor.getBoundingClientRect();
const anchorX = rekt.left + rekt.width / 2;
const anchorY = rekt.top + rekt.height / 2;
const d1 = document.querySelector(".hidden");

const home = document.querySelector("#home");
const cryptic = document.querySelector("#cryptic");

//process.env kar ports-------------------------------------->
home.addEventListener("click",(e)=>{
    e.preventDefault();
    location.reload();
});

cryptic.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = "http://localhost:3000/crypt";
});

document.addEventListener("mousemove",(e)=>{
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const angleDeg = angle(mouseX,mouseY,anchorX,anchorY);


    eyes.forEach(eye => {
        eye.style.transform = `rotate(${90+angleDeg}deg)`;
        // anchor.style.filter = `hue-rotate(${angleDeg}deg)`;
    });
})

function angle(cx,cy,ex,ey){
    const dy = ey-cy;
    const dx = ex-cx;
    const rad = Math.atan2(dy,dx);
    const deg = rad*180/Math.PI;
    return deg;
}


setTimeout(()=>{
    d1.classList.add("show");
    console.log(d1.classList)
},1000);





