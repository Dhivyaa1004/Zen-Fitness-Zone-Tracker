    <script>
        // Exercise descriptions
        const definitions = {
            "Dumbbell Lateral Lunge": "A lateral lunge with dumbbells strengthens your glutes, quads, and inner thighs.",
            "Seated Hamstring Stretch": "A stretch that helps improve hamstring flexibility and reduces lower back strain.",
            "Plank": "An isometric exercise that strengthens the core, shoulders, and back.",
            "Skipping": "A cardiovascular workout that improves agility, endurance, and coordination.",
            "Squat": "A lower-body exercise that targets the quads, hamstrings, and glutes.",
            "Standing Quadriceps Stretch": "A stretch that improves flexibility in the front of the thigh and prevents knee injuries."
        };

        function openModal(title, imgSrc) {
            document.getElementById("exercise-title").innerText = title;
            document.getElementById("exercise-img").src = imgSrc;
            document.getElementById("exercise-description").innerText = definitions[title] || "No description available.";
            document.getElementById("modal").style.display = "flex";
        }

        function closeModal() {
            document.getElementById("modal").style.display = "none";
        }
    </script>