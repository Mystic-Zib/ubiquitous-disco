const memberForm = document.querySelector("#memberForm");

const err = document.querySelector(".error-message");
const message = document.querySelector(".message");

memberForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.querySelector("#member").value;
  const email = document.querySelector("#mail").value;

  if (username === "" || email === "") {
    err.textContent = "Fill all details";
    memberForm.reset();
  } else {
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
      }),
    });

    const result = await response.json();

    if (result !== null) {
      console.log(result.message);
      if (result.message === undefined) {
        message.textContent = result.err;
        setTimeout(() => {
          message.textContent = "";
        }, 3000);

        memberForm.reset();
      } else {
        // Redirect on successful sign-up
        // window.location.href = `/${result.redirect}`;
        memberForm.reset();
        message.textContent = result.message;
        setTimeout(() => {
          message.textContent = "";
        }, 3000);
      }
    }
  }
});

const homeRedirect = document.querySelector("#home");
const crypticRedirect = document.querySelector("#cryptic");
const registerReload = document.querySelector("#register");

homeRedirect.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/home";
});

crypticRedirect.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/cryptic";
});

registerReload.addEventListener("click", (e) => {
  e.preventDefault();
  location.reload();
});
