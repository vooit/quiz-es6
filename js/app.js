/**
 * Created by wojciechpac on 07.09.2017.
 */


(function() {
    const myQuestions = [
        {
            question: "Uszy Kota rozpłaszczone ku tyłowi oznaczają:",
            answers: {
                A: "Że Kot jest spokojny",
                B: "Nic konkretnego, to automatyczna pozycja przyjmowana bezwiednie",
                C: "Że Kot jest zły lub się boi"
            },
            correctAnswer: "C"
        },
        {
            question: "Gruczoły wydzielające uspokajające feromony u Kota znajdują się:",
            answers: {
                A: "Między uszami",
                B: "Na karku",
                C: "W okolicach nosa"
              },
            correctAnswer: "A"
        },
        {
            question: "Jedzenie tylko jedną stroną pyszczka oznacza:",
            answers: {
                A: "Że Kot po jednej stronie pyszczka posiada lepsze uzębienie, które lepiej rozdrabnia pokarm",
                B: "Że Kot ma problemy z uzębieniem",
                C: "Że Kot ma infekcję gardła"
            },
            correctAnswer: "A"
        },
        {
            question: "Czy pokarm ma wpływ na higienę jamy ustnej Kota?",
            answers: {
                A: "Nie ma żadnego wpływu",
                B: "Tylko jeżeli zjada więcej niż 4 posiłki dziennie",
                C: "Tak, niektóre karmy usuwają kamień nazębny i oczyszczają zęby, działając podobnie jak szczoteczka"
            },
            correctAnswer: "C"
        },
        {
            question: "Jak powtrzymać Kota od drapania mebli?",
            answers: {
                A: "Należy przykryć meble plastikową folią i zaopatrzyć go w odpowiednią ilość drapaków",
                B: "Okazywaniem czułości wobec Kota i podawaniem mu smakołyków dla odwrócenia uwagi",
                C: "Nie należy tego powstrzymywać, to naturalny instynkt"
            },
            correctAnswer: "A"
        },
        {
            question: "Na problem z układem moczowym Kota wskazuje:",
            answers: {
                A: "Brak chęci do zabawy, nawet ulubionymi zabawkami",
                B: "Brak apetytu",
                C: "Pojękiwanie podczas załatwiania się, oddawanie moczu poza kuwetą"
            },
            correctAnswer: "C"
        },
        {
            question: "Zęby Kota powinny być czyszczone:",
            answers: {
                A: "Co kilka miesięcy",
                B: "Raz na rok",
                C: "Codziennie lub przynajmniej kilka razy w tygodniu"
             },
            correctAnswer: "C"
        },
        {
            question: "Rozszerzone źrenice u Kota:",
            answers: {
                A: "Świadczą o pobudzeniu i zaangażowaniu, np. podczas zabawy",
                B: "Świadczą o tym, że Kot jest senny i spokojny",
                C: "Mogą świadczyć zarówno o zaangażowaniu w zabawę, jak i mogą być objawem lęku i przerażenia"
            },
            correctAnswer: "C"
        },
        {
            question: "Co może wskazywać na cukrzycę u Kota?",
            answers: {
                A: "Wzmożony głód i pragnienie",
                B: "Bezsenność Kota",
                C: "Cukrzyca u Kotów jest bezobjawowa"
            },
            correctAnswer: "A"
        },
        {
            question: "Najmniej korzystnymi produktami w diecie kota są:",
            answers: {
                A: "Jajka, cebula, czosnek, czekolada i rodzynki",
                B: "Świeże warzywa i owoce, w szczególności słodka marchewka",
                C: "Kot może jeść wszystko"
            },
            correctAnswer: "A"
        }
    ];


    /* --------TIMER--------- */

    var totalSeconds = 0;

    timer = setInterval(setTime, 1000);
    function setTime()
    {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds%60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
    }

    function pad(val)
    {
        var valString = val + "";
        if(valString.length < 2)
        {
            return "0" + valString;
        }
        else
        {
            return valString;
        }
    }
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");

    function clear() {
        clearInterval(timer);
    }
    /* --------TIMER END--------- */

    /* --------GAME--------- */
    function buildQuiz() {
        // we'll need a place to store the HTML output
        const output = [];


        myQuestions.forEach((currentQuestion, questionNumber) => {
            // for each question...
            // set store for answers
            const answers = [];


        for (letter in currentQuestion.answers) {
            // and for each available answer...
            // add an HTML radio button
            answers.push(
                `<label>
			  <!--(${letter})-->
			  <input type="radio" name="question${questionNumber}" value="${letter}">
              ${currentQuestion.answers[letter]}
           </label>`
            );
        }

        // add this question and its answers to the output
        output.push(
            `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
        );
    });

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join(" ");
    }

    function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = "lightgreen";
        } else {
            // if answer is wrong or blank
            // color the answers red
            answerContainers[questionNumber].style.color = "red";
        }
    });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `Poprawnych odpowiedzi ${numCorrect} z ${myQuestions.length}`;
        clear();
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    // display quiz right away
    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(0);





    // on submit, show results
    submitButton.addEventListener("click", showResults);
    // submitButton.addEventListener("click", clear);/
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();
