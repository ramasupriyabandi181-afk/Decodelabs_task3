
const courses = [
    {
        name: "Python for Beginners",
        tags: ["Python", "AI", "Data"]
    },
    {
        name: "Artificial Intelligence",
        tags: ["AI", "Python", "ML"]
    },
    {
        name: "Machine Learning",
        tags: ["ML", "Python", "Data"]
    },
    {
        name: "Web Development",
        tags: ["Web"]
    },
    {
        name: "Data Science",
        tags: ["Data", "Python", "ML"]
    },
    {
        name: "Deep Learning",
        tags: ["AI", "ML", "Python"]
    }
];

function recommendCourses() {
    const username =
        document.getElementById("username").value.trim();

    const selected = [
        ...document.querySelectorAll(
            'input[type="checkbox"]:checked'
        )
    ].map(item => item.value);

    const results = document.getElementById("results");

    if (username === "") {
        results.innerHTML = "Please enter your name.";
        return;
    }

    if (selected.length === 0) {
        results.innerHTML = "Please select at least one interest.";
        return;
    }

    const recommendations = courses.map(course => {
        const matches = course.tags.filter(tag =>
            selected.includes(tag)
        ).length;

        const score = Math.round(
            (matches / selected.length) * 100
        );

        return {
            name: course.name,
            score: score,
            matches: matches
        };
    });

    recommendations.sort((a, b) =>
        b.score - a.score || b.matches - a.matches
    );

    results.innerHTML =
        `<h2>Hello, ${username}!</h2>
         <h3>Recommended Courses</h3>`;

    recommendations
        .filter(course => course.matches > 0)
        .forEach(course => {
            results.innerHTML += `
                <div class="course">
                    <strong>${course.name}</strong><br>
                    Match Score: ${course.score}%
                </div>
            `;
        });
}
