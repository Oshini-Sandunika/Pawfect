document.addEventListener("DOMContentLoaded", function () {
    const questionText = document.getElementById("question-text");
    const optionsBox = document.getElementById("options");
    const nextBtn = document.getElementById("next-btn");
    const resultBox = document.getElementById("result-box");
    const resultText = document.getElementById("dog-result");

    const backBtn = document.getElementById("back-btn");

    /* ------------------------------------------
    FULL 10-QUESTION DOG QUIZ WITH BREED SCORING
    ------------------------------------------ */
    const dogQuestions = [
        {
            q: "How active is your daily lifestyle?",
            options: {
                "Very active (running, hiking daily)": "very_active",
                "Moderately active": "moderate_active",
                "Lightly active": "light_active",
                "Mostly relaxed / indoors": "low_active"
            }
        },
        {
            q: "How much living space do you have?",
            options: {
                "Large house with yard": "large_space",
                "Medium house/apartment": "medium_space",
                "Small apartment": "small_space",
                "Tiny living space / studio": "tiny_space"
            }
        },
        {
            q: "How much grooming can you manage?",
            options: {
                "High grooming (daily brushing okay)": "high_groom",
                "Medium grooming": "medium_groom",
                "Low grooming only": "low_groom",
                "Minimal (almost no grooming)": "minimal_groom"
            }
        },
        {
            q: "What is your experience with dogs?",
            options: {
                "Experienced dog owner": "experienced",
                "Some experience": "intermediate",
                "Beginner": "beginner",
                "Never owned a dog": "first_time"
            }
        },
        {
            q: "What size dog do you prefer?",
            options: {
                "Small": "size_small",
                "Medium": "size_medium",
                "Large": "size_large",
                "No preference": "size_any"
            }
        },
        {
            q: "How trainable should your dog be?",
            options: {
                "Highly trainable": "high_train",
                "Medium trainability": "medium_train",
                "Low trainability": "low_train",
                "Doesn't matter": "train_any"
            }
        },
        {
            q: "How much barking can you tolerate?",
            options: {
                "Very low (quiet dogs only)": "quiet_only",
                "Some barking is okay": "some_noise",
                "Barking doesn’t bother me": "noise_ok",
                "I prefer vocal dogs": "vocal"
            }
        },
        {
            q: "What climate suits your home best?",
            options: {
                "Cold climate": "cold_climate",
                "Warm climate": "warm_climate",
                "Both / mixed": "mixed_climate",
                "Hot climate only": "hot_climate"
            }
        },
        {
            q: "How much time daily can you dedicate to your dog?",
            options: {
                "5+ hours": "time_5",
                "2–4 hours": "time_3",
                "1–2 hours": "time_1",
                "Less than 1 hour": "time_low"
            }
        },
        {
            q: "Do you need a family- and kid-friendly dog?",
            options: {
                "Very important": "family_high",
                "Somewhat important": "family_medium",
                "Not important": "family_low",
                "Not needed": "family_none"
            }
        }
    ];

    /* ------------------------------------------
       BREED SCORING
    ------------------------------------------ */

    let breedScores = {
        "Labrador Retriever": 0,
        "Golden Retriever": 0,
        "German Shepherd": 0,
        "Border Collie": 0,
        "Husky": 0,
        "Beagle": 0,
        "French Bulldog": 0,
        "Pug": 0,
        "Shih Tzu": 0,
        "Corgi": 0
    };

    /* ------------------------------------------
       SCORING MATRIX
       Each answer boosts certain breeds
    ------------------------------------------ */

    function applyScore(answer) {
        switch (answer) {
            case "very_active":
                breedScores["Border Collie"] += 3;
                breedScores["Husky"] += 3;
                breedScores["German Shepherd"] += 2;
                breedScores["Labrador Retriever"] += 1;
                break;

            case "moderate_active":
                breedScores["Golden Retriever"] += 2;
                breedScores["Labrador Retriever"] += 2;
                breedScores["Beagle"] += 1;
                break;

            case "light_active":
                breedScores["French Bulldog"] += 2;
                breedScores["Corgi"] += 1;
                break;

            case "low_active":
                breedScores["Pug"] += 3;
                breedScores["Shih Tzu"] += 2;
                break;

            /* --- Space --- */

            case "large_space":
                breedScores["German Shepherd"] += 2;
                breedScores["Husky"] += 2;
                breedScores["Border Collie"] += 1;
                break;

            case "medium_space":
                breedScores["Golden Retriever"] += 1;
                breedScores["Labrador Retriever"] += 1;
                break;

            case "small_space":
                breedScores["French Bulldog"] += 2;
                breedScores["Pug"] += 2;
                break;

            case "tiny_space":
                breedScores["Shih Tzu"] += 2;
                breedScores["Corgi"] += 1;
                break;

            /* --- Grooming --- */

            case "high_groom":
                breedScores["Shih Tzu"] += 2;
                break;

            case "medium_groom":
                breedScores["Golden Retriever"] += 1;
                break;

            case "low_groom":
                breedScores["Labrador Retriever"] += 1;
                breedScores["Beagle"] += 1;
                break;

            case "minimal_groom":
                breedScores["Husky"] += 1;
                break;

            /* --- Experience --- */

            case "experienced":
                breedScores["German Shepherd"] += 2;
                breedScores["Husky"] += 1;
                break;

            case "intermediate":
                breedScores["Beagle"] += 1;
                break;

            case "beginner":
                breedScores["Golden Retriever"] += 2;
                breedScores["Labrador Retriever"] += 2;
                break;

            case "first_time":
                breedScores["Corgi"] += 1;
                breedScores["Pug"] += 1;
                break;

            /* --- Size --- */

            case "size_small":
                breedScores["Pug"] += 2;
                breedScores["Corgi"] += 1;
                breedScores["Shih Tzu"] += 1;
                breedScores["French Bulldog"] += 1;
                break;

            case "size_medium":
                breedScores["Beagle"] += 1;
                breedScores["Corgi"] += 1;
                break;

            case "size_large":
                breedScores["Golden Retriever"] += 2;
                breedScores["German Shepherd"] += 2;
                breedScores["Husky"] += 1;
                break;

            /* --- Trainability --- */

            case "high_train":
                breedScores["Golden Retriever"] += 2;
                breedScores["German Shepherd"] += 2;
                breedScores["Border Collie"] += 3;
                break;

            case "medium_train":
                breedScores["Labrador Retriever"] += 1;
                break;

            case "low_train":
                breedScores["Beagle"] += 1; // stubborn
                break;

            /* --- Barking --- */

            case "quiet_only":
                breedScores["Shih Tzu"] += 2;
                breedScores["French Bulldog"] += 1;
                break;

            case "some_noise":
                breedScores["Golden Retriever"] += 1;
                break;

            case "noise_ok":
                breedScores["Beagle"] += 1;
                break;

            case "vocal":
                breedScores["Husky"] += 2;
                breedScores["Beagle"] += 1;
                break;

            /* --- Climate --- */

            case "cold_climate":
                breedScores["Husky"] += 3;
                break;

            case "warm_climate":
                breedScores["Pug"] += 1;
                breedScores["Shih Tzu"] += 1;
                breedScores["Beagle"] += 1;
                break;

            case "hot_climate":
                breedScores["Beagle"] += 2;
                break;

            /* --- Time --- */

            case "time_5":
                breedScores["Border Collie"] += 2;
                breedScores["German Shepherd"] += 1;
                break;

            case "time_3":
                breedScores["Golden Retriever"] += 1;
                break;

            case "time_1":
                breedScores["French Bulldog"] += 1;
                break;

            case "time_low":
                breedScores["Pug"] += 2;
                break;

            /* --- Family friendliness --- */

            case "family_high":
                breedScores["Golden Retriever"] += 3;
                breedScores["Labrador Retriever"] += 3;
                breedScores["Beagle"] += 1;
                break;

            case "family_medium":
                breedScores["Corgi"] += 1;
                break;

            case "family_low":
                breedScores["Husky"] += 1;
                break;
        }
    }

    function recalculateScores() {
        // Reset scores
        for (let breed in breedScores) {
            breedScores[breed] = 0;
        }

        // Re-apply based on selected answers
        selectedAnswers.forEach(answer => {
            if (answer) applyScore(answer);
        });
    }

    /* ------------------------------------------
      QUIZ ENGINE (UI)
    ------------------------------------------ */

    let currentQuestion = 0;
    let selectedAnswers = [];

    const totalQuestions = dogQuestions.length;

    function updateProgressBar() {
        const progress = ((currentQuestion) / totalQuestions) * 100;
        document.getElementById("progress-bar").style.width = progress + "%";
        document.getElementById("progress-paw").style.left = progress + "%";
    }


    function loadQuestion() {
        resultBox.classList.add("hidden");
        updateProgressBar();
        backBtn.classList.toggle("hidden", currentQuestion === 0);
        backBtn.onclick = () => {
            if (!resultBox.classList.contains("hidden")) return;

            if (currentQuestion > 0) {
                currentQuestion--;
                recalculateScores();
                loadQuestion();
            }
        };

        const q = dogQuestions[currentQuestion];
        questionText.textContent = q.q;
        nextBtn.disabled = true;

        optionsBox.innerHTML = "";

        Object.keys(q.options).forEach(option => {
            const btn = document.createElement("button");
            btn.textContent = option;
            btn.className = "option-btn";

            btn.onclick = () => {
                document.querySelectorAll(".option-btn")
                    .forEach(b => b.classList.remove("selected"));

                btn.classList.add("selected");

                selectedAnswers[currentQuestion] = q.options[option];
                nextBtn.disabled = false;
            };

            optionsBox.appendChild(btn);
        });
    }

    nextBtn.onclick = () => {
        // Move to next question
        currentQuestion++;

        // Recalculate scores based on updated answers
        recalculateScores();

        // If quiz is not finished → load next question
        if (currentQuestion < dogQuestions.length) {
            loadQuestion();
        }
        // If quiz is finished → show results
        else {
            finalizeResults();
        }
    };

    const breedImages = {
        "Labrador Retriever": "./images/breeds/labradorRetriever.jpg",
        "Golden Retriever": "./images/breeds/goldenRetriever.jpg",
        "German Shepherd": "./images/breeds/germanShepherd.jpg",
        "Border Collie": "./images/breeds/borderCollie.jpg",
        "Husky": "./images/breeds/husky.jpg",
        "Beagle": "./images/breeds/beagle.jpg",
        "French Bulldog": "./images/breeds/frenchBulldog.jpg",
        "Pug": "./images/breeds/pug.jpg",
        "Shih Tzu": "./images/breeds/shihTzu.jpg",
        "Corgi": "./images/breeds/corgi.jpg"
    };

    const catBreedImages = {
        "Domestic Short Hair": "./images/cats/dsh.avif",
        "Domestic Medium Hair": "./images/cats/dmh.jpg",
        "Domestic Long Hair": "./images/cats/dlh.webp",
        "Tuxedo Cat": "./images/cats/tuxedo.jpg",
        "Ginger Cat": "./images/cats/ginger.webp",
        "Calico / Tortie": "./images/cats/calico.jpg",
        "Black Cat": "./images/cats/black.jpg"
    };


    function finalizeResults() {
        // Progress bar full
        document.getElementById("progress-bar").style.width = "100%";
        document.getElementById("progress-paw").style.left = "100%";

        // Hide the entire question section but keep progress bar visible
        document.getElementById("question-box").style.display = "none";

        // Hide navigation buttons
        nextBtn.style.display = "none";
        backBtn.classList.add("hidden");

        // Show results
        resultBox.classList.remove("hidden");

        // Smooth scroll to results
        document.getElementById("dog-quiz").scrollTop = 0;


        // Prepare result cards
        const resultsRow = document.getElementById("dog-results-row");

        const topBreeds = Object.entries(breedScores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(b => b[0]);

        resultsRow.innerHTML = "";

        topBreeds.forEach(breed => {
            const card = document.createElement("div");
            card.classList.add("breed-card");

            card.innerHTML = `
            <img src="${breedImages[breed]}" alt="${breed}">
            <h4>${breed}</h4>
          `;

            resultsRow.appendChild(card);
        });
    }

    loadQuestion();

    document.getElementById("restart-btn").onclick = function () {
        // Hide results immediately
        resultBox.classList.add("hidden");

        currentQuestion = 0;
        selectedAnswers = [];

        // Reset breed scores
        for (let breed in breedScores) {
            breedScores[breed] = 0;
        }

        // Clear previous results
        document.getElementById("dog-results-row").innerHTML = "";

        // Show question box again
        document.getElementById("question-box").style.display = "block";

        // Show next button again
        nextBtn.style.display = "block";

        // Hide back button until question > 0
        backBtn.classList.add("hidden");

        // Reset progress bar
        document.getElementById("progress-bar").style.width = "0%";

        // Scroll back to quiz top
        document.getElementById("dog-quiz").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        // Load question 1
        loadQuestion();
    };


    /* ------------------------------------------
      CAT QUIZ QUESTIONS
    ------------------------------------------- */
    const catQuestions = [
        {
            q: "What energy level do you prefer in a cat?",
            options: {
                "Playful & energetic": "active",
                "Balanced – playful but calm": "balanced",
                "Mostly calm & relaxed": "calm",
                "Very low energy": "very_calm"
            }
        },
        {
            q: "How much grooming are you comfortable with?",
            options: {
                "Daily brushing is fine": "high_groom",
                "Occasional brushing": "medium_groom",
                "Minimal grooming only": "low_groom",
                "Almost none": "minimal"
            }
        },
        {
            q: "What kind of personality do you want?",
            options: {
                "Affectionate lap cat": "affectionate",
                "Independent but friendly": "independent",
                "Social & playful": "social",
                "Quiet & gentle": "gentle"
            }
        },
        {
            q: "Do you have small kids?",
            options: {
                "Yes, important": "kid_friendly",
                "Sometimes visiting kids": "semi_kid",
                "No kids": "no_kid",
                "Prefer quieter personalities": "quiet_pref"
            }
        },
        {
            q: "How vocal do you want your cat?",
            options: {
                "Talkative/meows often": "vocal",
                "Sometimes vocal": "semi_vocal",
                "Quiet": "quiet",
                "Very quiet": "very_quiet"
            }
        },
        {
            q: "Do you prefer a specific coat or pattern?",
            options: {
                "Ginger": "ginger",
                "Black": "black",
                "Tuxedo": "tuxedo",
                "No preference": "any_pattern"
            }
        },
        {
            q: "What size cat do you prefer?",
            options: {
                "Small": "small_cat",
                "Medium": "medium_cat",
                "Large": "large_cat",
                "No preference": "any_size"
            }
        },
        {
            q: "How much playtime can you give daily?",
            options: {
                "2+ hours": "time_high",
                "1 hour": "time_med",
                "30 minutes": "time_low",
                "Very little": "time_very_low"
            }
        }
    ];

    /* ------------------------------------------
      CAT BREED SCORING
    ------------------------------------------- */
    let catScores = {
        "Domestic Short Hair": 0,
        "Domestic Medium Hair": 0,
        "Domestic Long Hair": 0,
        "Tuxedo Cat": 0,
        "Ginger Cat": 0,
        "Calico / Tortie": 0,
        "Black Cat": 0
    };

    /* ------------------------------------------
        CAT ANSWER SCORING LOGIC
    ------------------------------------------- */
    function scoreCat(answer) {

        switch (answer) {

            case "active":
                catScores["Domestic Short Hair"] += 2;
                break;

            case "balanced":
                catScores["Domestic Medium Hair"] += 2;
                break;

            case "calm":
            case "very_calm":
                catScores["Domestic Long Hair"] += 2;
                break;

            case "high_groom":
                catScores["Domestic Long Hair"] += 2;
                break;

            case "medium_groom":
                catScores["Domestic Medium Hair"] += 1;
                break;

            case "low_groom":
            case "minimal":
                catScores["Domestic Short Hair"] += 1;
                break;

            case "affectionate":
                catScores["Calico / Tortie"] += 1;
                catScores["Domestic Medium Hair"] += 1;
                break;

            case "independent":
                catScores["Black Cat"] += 2;
                break;

            case "social":
                catScores["Tuxedo Cat"] += 2;
                break;

            case "gentle":
                catScores["Domestic Long Hair"] += 2;
                break;

            case "kid_friendly":
                catScores["Ginger Cat"] += 2;
                break;

            case "semi_kid":
                catScores["Domestic Medium Hair"] += 1;
                break;

            case "vocal":
                catScores["Tuxedo Cat"] += 2;
                break;

            case "semi_vocal":
                catScores["Ginger Cat"] += 1;
                break;

            case "quiet":
            case "very_quiet":
                catScores["Black Cat"] += 2;
                break;

            case "ginger":
                catScores["Ginger Cat"] += 3;
                break;

            case "black":
                catScores["Black Cat"] += 3;
                break;

            case "tuxedo":
                catScores["Tuxedo Cat"] += 3;
                break;

            case "small_cat":
                catScores["Calico / Tortie"] += 1;
                break;

            case "medium_cat":
                catScores["Domestic Medium Hair"] += 2;
                break;

            case "large_cat":
                catScores["Domestic Long Hair"] += 2;
                break;

            case "time_high":
                catScores["Domestic Short Hair"] += 2;
                break;

            case "time_low":
            case "time_very_low":
                catScores["Black Cat"] += 1;
                break;
        }

    }

    /* ------------------------------------------
      CAT QUIZ ENGINE
    ------------------------------------------- */

    let catCurrent = 0;
    let catAnswers = [];

    const totalCatQ = catQuestions.length;

    function updateCatProgress() {
        const p = (catCurrent / totalCatQ) * 100;
        document.getElementById("cat-progress-bar").style.width = p + "%";
        document.getElementById("cat-progress-paw").style.left = p + "%";
    }

    function loadCatQuestion() {

        updateCatProgress();

        document.getElementById("cat-back-btn")
            .classList.toggle("hidden", catCurrent === 0);

        const q = catQuestions[catCurrent];

        document.getElementById("cat-question-text").textContent = q.q;
        const box = document.getElementById("cat-options");
        box.innerHTML = "";

        Object.keys(q.options).forEach(op => {
            const btn = document.createElement("button");
            btn.textContent = op;
            btn.className = "option-btn";

            btn.onclick = () => {
                document.querySelectorAll("#cat-options .option-btn")
                    .forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                catAnswers[catCurrent] = q.options[op];
                document.getElementById("cat-next-btn").disabled = false;
            };

            box.appendChild(btn);
        });

        document.getElementById("cat-next-btn").disabled = true;
    }


    /* NEXT */
    document.getElementById("cat-next-btn").onclick = function () {
        catCurrent++;

        if (catCurrent < totalCatQ) {
            loadCatQuestion();
        } else {
            // FIX: make progress bar full before showing results
            document.getElementById("cat-progress-bar").style.width = "100%";
            document.getElementById("cat-progress-paw").style.left = "100%";

            finalizeCatResults();
        }
    };


    /* BACK */
    document.getElementById("cat-back-btn").onclick = function () {
        if (catCurrent > 0) {
            catCurrent--;
            loadCatQuestion();
        }
    };


    /* FINAL RESULTS */
    function finalizeCatResults() {

        // hide questions
        document.getElementById("cat-question-box").style.display = "none";
        document.getElementById("cat-next-btn").style.display = "none";
        document.getElementById("cat-back-btn").style.display = "none";

        // apply all scores
        catScores = Object.fromEntries(Object.keys(catScores).map(k => [k, 0]));
        catAnswers.forEach(ans => ans && scoreCat(ans));

        // show results
        const res = document.getElementById("cat-result-box");
        res.classList.remove("hidden");

        const row = document.getElementById("cat-results-row");
        row.innerHTML = "";

        const topCats = Object.entries(catScores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(b => b[0]);

        topCats.forEach(cat => {
            const card = document.createElement("div");
            card.className = "breed-card";

            card.innerHTML = `
            <img src="${catBreedImages[cat]}" alt="${cat}">
            <h4>${cat}</h4>
          `;

            row.appendChild(card);
        });
    }

    /* RESTART */
    document.getElementById("cat-restart-btn").onclick = function () {
        catCurrent = 0;
        catAnswers = [];

        document.getElementById("cat-results-row").innerHTML = "";
        document.getElementById("cat-result-box").classList.add("hidden");

        document.getElementById("cat-question-box").style.display = "block";
        document.getElementById("cat-next-btn").style.display = "block";
        document.getElementById("cat-back-btn").style.display = "none";

        loadCatQuestion();
    };

    // ------- SECTION NAVIGATION -------- //

    const landingSection = document.querySelector(".page");
    const dogQuiz = document.getElementById("dog-quiz");
    const catQuiz = document.getElementById("cat-quiz");

    // open dog quiz
    document.querySelector('a[href="#dog-quiz"]').addEventListener("click", function (e) {
        e.preventDefault();

        slideToSection(dogQuiz, landingSection);

        catQuiz.style.display = "none";

        currentQuestion = 0;
        loadQuestion();
    });


    // open cat quiz
    document.querySelector('a[href="#cat-quiz"]').addEventListener("click", function (e) {
        e.preventDefault();

        slideToSection(catQuiz, landingSection);

        dogQuiz.style.display = "none";

        catCurrent = 0;
        catAnswers = [];
        loadCatQuestion();
    });


    function slideToSection(show, hide) {
        hide.style.transition = "transform 0.6s ease, opacity 0.6s ease";
        show.style.transition = "transform 0.6s ease, opacity 0.6s ease";

        // slide hide section UP & fade out
        hide.style.transform = "translateY(-40px)";
        hide.style.opacity = "0";

        setTimeout(() => {
            hide.style.display = "none";

            // reset shown section before animating
            show.style.display = "block";
            show.style.transform = "translateY(40px)";
            show.style.opacity = "0";

            setTimeout(() => {
                // slide show section DOWN & fade in
                show.style.transform = "translateY(0)";
                show.style.opacity = "1";
            }, 20);
        }, 450);
    }

    document.getElementById("dog-back-to-start").onclick = () => {
        slideToSection(landingSection, dogQuiz);
    };

    document.getElementById("cat-back-to-start").onclick = () => {
        slideToSection(landingSection, catQuiz);
    };
});