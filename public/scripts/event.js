const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const submitButton = document.getElementById("submit");
const messageElement = document.getElementById("message");

function getQuestion() {
  fetch("/question")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      questionElement.textContent = data.question;
    })
    .catch((error) => {
      console.error(error);
      questionElement.textContent = "Failed to retrieve question.";
    });
}

function submitAnswer() {
  const userAnswer = answerElement.value;
  fetch("/answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer: userAnswer }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      messageElement.textContent = data.message;
      setTimeout(() => {
        messageElement.textContent = "";
      }, 3000);
      answerElement.value = "";
      getQuestion();
    })
    .catch((error) => {
      console.error(error);
      messageElement.textContent = "Error submitting answer.";
      setTimeout(() => {
        messageElement.textContent = "";
      }, 3000);
    });
}

submitButton.addEventListener("click", submitAnswer);
answerElement.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submitAnswer();
  }
});

getQuestion();
