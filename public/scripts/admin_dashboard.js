const ctx = document.getElementById("myChart");

var teamDataArr;
var performanceDataArr;
var teamNamesArr;
var teamsScoreArr;

async function getData() {
  try {
    const response = await fetch("/dashboard");
    const result = await response.json();
    teamDataArr = result.teamData;
    performanceDataArr = result.performanceData;
    teamDataArr.forEach((el) => {
      teamNamesArr.push(el.name);
    });
    performanceDataArr.forEach((el) => {
      teamsScoreArr.push(el.score);
    });
  } catch (err) {
    console.log(err);
  }
}

getData();
console.log(teamNamesArr);
console.log(teamsScoreArr);

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
