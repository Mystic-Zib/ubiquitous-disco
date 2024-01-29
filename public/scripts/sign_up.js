// Constants
const signUpForm = document.querySelector("form");
const err = document.querySelector("#err");


signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const lName = document.querySelector("#username").value;
        const lPassword = document.querySelector("#password").value;
        const lMail = document.querySelector("#mail").value;
        // const role = document.querySelector("#role").value;
        const teamName = document.querySelector("#teamName").value;

        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                lName,
                lPassword,
                lMail,
                teamName
            }),
        });

        const result = await response.json();

        if (result !== null) {
            if (result.redirect === undefined) {
                err.textContent = result.err;

                signUpForm.reset();
            } else {
                // Redirect on successful sign-up
                window.location.href = `http://localhost:3000/${result.redirect}`;
            }
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
});
