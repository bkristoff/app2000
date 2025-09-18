// Basert på Chart.js:
// https://www.chartjs.org/docs/latest/getting-started/

// Standard-eksempelet
function addVotingChart(id) {
  const ctx = document.getElementById(id);
  let chart = new Chart(ctx, {
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
  return chart;
}

// En variant der brukeren dynamisk kan endre diagrammet.
// Basert på teknikker her: https://www.chartjs.org/docs/latest/developers/api.html
function addWeatherChart(id) {
  const ctx = document.getElementById(id);
  const dataset = [
    {
      label: "Rainfall",
      data: [
        { month: "Jan", observation: { rainfall: 150, avgTemp: 3 } },
        { month: "Feb", observation: { rainfall: 120, avgTemp: 4 } },
        { month: "Mar", observation: { rainfall: 90, avgTemp: 9 } },
        { month: "Apr", observation: { rainfall: 45, avgTemp: 12 } },
        { month: "May", observation: { rainfall: 30, avgTemp: 18 } },
      ],
    },
  ];
  const cfg = {
    type: "bar",
    data: {
      datasets: dataset,
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Weather observations",
        },
      },
      parsing: {
        xAxisKey: "month",
        yAxisKey: "observation.rainfall",
      },
    },
  };
  return new Chart(ctx, cfg);
}

function showTemp(event) {
  weatherChart.options.parsing.yAxisKey = "observation.avgTemp"; // bytter datasett
  weatherChart.data.datasets[0].label = "Average temperature"; // bytter etiketter
  weatherChart.update();
}

// Oppretter søylediagrammene
let votingChart = addVotingChart("votingChart");
let weatherChart = addWeatherChart("weatherChart");

// Lytter på knappen som endrer fra nedbør til temperatur
let btn = document.getElementById("showTemp");
btn.addEventListener("click", showTemp);
