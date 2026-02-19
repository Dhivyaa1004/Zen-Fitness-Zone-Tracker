document.addEventListener("DOMContentLoaded", function() {
    let workoutData = JSON.parse(localStorage.getItem("workoutData")) || {};
    let dietData = JSON.parse(localStorage.getItem("dietData")) || {};

    updateChart("workoutChart", workoutData);
    updateDietChart(dietData);
});

let charts = {}; // Store chart instances globally

function updateChart(id, storedData) {
    let ctx = document.getElementById(id).getContext("2d");

    let labels = Object.keys(storedData); // Get dates
    let data = labels.map(date => storedData[date].reduce((a, b) => a + b, 0)); // Sum values per day

    // Generate different colors for each day's workout bar
    let colors = id === "workoutChart" 
        ? labels.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`) 
        : "rgba(0, 255, 255, 0.5)"; // Keep diet chart color unchanged

    if (charts[id]) {
        charts[id].destroy(); // Destroy previous chart instance before updating
    }

    charts[id] = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{ 
                label: id === "workoutChart" ? "Workout Duration (mins)" : "Water Intake (ml)", 
                data: data, 
                backgroundColor: colors // Apply unique colors only to workout bars
            }]
        },
        options: { 
            scales: { y: { beginAtZero: true } }
        }
    });
}


function addWorkout() {
    let duration = parseInt(document.getElementById("duration").value);
    if (duration) {
        let today = new Date().toISOString().split('T')[0];

        let workoutData = JSON.parse(localStorage.getItem("workoutData")) || {};
        if (!workoutData[today]) {
            workoutData[today] = [];
        }
        workoutData[today].push(duration);

        localStorage.setItem("workoutData", JSON.stringify(workoutData));

        updateChart("workoutChart", workoutData); // ✅ Update graph instantly
    }
}

function addDiet() {
    let calories = parseInt(document.getElementById("caloriesMeal").value);
    let water = parseInt(document.getElementById("water").value);
    if (calories || water) {
        let today = new Date().toISOString().split('T')[0];

        let dietData = JSON.parse(localStorage.getItem("dietData")) || {};
        if (!dietData[today]) {
            dietData[today] = { calories: 0, water: 0 };
        }
        dietData[today].calories += calories || 0;
        dietData[today].water += water || 0;

        localStorage.setItem("dietData", JSON.stringify(dietData));

        updateDietChart(dietData); // ✅ Update graph instantly
    }
}

function updateDietChart(storedData) {
    let ctx = document.getElementById("dietChart").getContext("2d");

    let labels = Object.keys(storedData); // Get dates
    let caloriesData = labels.map(date => storedData[date].calories);
    let waterData = labels.map(date => storedData[date].water);

    if (charts["dietChart"]) {
        charts["dietChart"].destroy(); // Destroy previous chart instance
    }

    charts["dietChart"] = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels, // ✅ Display Dates as labels
            datasets: [
                {
                    label: "Calories Intake (kcal)",
                    data: caloriesData,
                    backgroundColor: "rgba(255, 99, 132, 0.5)"
                },
                {
                    label: "Water Intake (ml)",
                    data: waterData,
                    backgroundColor: "rgba(0, 255, 255, 0.5)"
                }
            ]
        },
        options: { 
            scales: { 
                x: { title: { display: true, text: "Date" } }, // ✅ Add x-axis title
                y: { beginAtZero: true, title: { display: true, text: "Amount" } } // ✅ Add y-axis title
            }
        }
    });
}
