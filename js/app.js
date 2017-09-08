/**
 * Created by wojciechpac on 07.09.2017.
 */


/* --------TIMER--------- */


var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

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
            question: "Zęby Kota powinny być czyszczone…",
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

    function buildQuiz() {
        // we'll need a place to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            const answers = [];

        // and for each available answer...
        for (letter in currentQuestion.answers) {
            // ...add an HTML radio button
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
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
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
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();
console.log('ewwwe')

/* ----------- TIMER ----------- */
//
// function getTimeRemaining(endtime) {
//     var t = Date.parse(endtime) - Date.parse(new Date());
//     var seconds = Math.floor((t / 1000) % 60);
//     var minutes = Math.floor((t / 1000 / 60) % 60);
//     var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
//     var days = Math.floor(t / (1000 * 60 * 60 * 24));
//     return {
//         'total': t,
//         'days': days,
//         'hours': hours,
//         'minutes': minutes,
//         'seconds': seconds
//     };
// }
//
// function initializeClock(id, endtime) {
//     var clock = document.getElementById(id);
//     var daysSpan = clock.querySelector('.days');
//     var hoursSpan = clock.querySelector('.hours');
//     var minutesSpan = clock.querySelector('.minutes');
//     var secondsSpan = clock.querySelector('.seconds');
//
//     function updateClock() {
//         var t = getTimeRemaining(endtime);
//
//         daysSpan.innerHTML = t.days;
//         hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
//         minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
//         secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
//
//         if (t.total <= 0) {
//             clearInterval(timeinterval);
//         }
//     }
//
//     updateClock();
//     var timeinterval = setInterval(updateClock, 1000);
// }
//
// var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
// // if there's a cookie with the name myClock, use that value as the deadline
// if(document.cookie && document.cookie.match('myClock')){
//     // get deadline value from cookie
//     var deadline = document.cookie.match(/(^|;)myClock=([^;]+)/)[2];
// }
//
// // otherwise, set a deadline 10 minutes from now and
// // save it in a cookie with that name
// else{
//     // create deadline 10 minutes from now
//     var timeInMinutes = 60;
//     var currentTime = Date.parse(new Date());
//     var deadline = new Date(currentTime + timeInMinutes*60*1000);
//
//     // store deadline in cookie for future reference
//     document.cookie = 'myClock=' + deadline + '; path=/; domain=tcafe.net';
// }
// initializeClock('clockdiv', deadline);
// var timeInMinute = setTimeout(myFunction, 3600000);
// function myFunction() {
//     alert('Time up');
// }
//
//
// function setCookie(cname,cvalue,exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires=" + d.toGMTString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }
//
// function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }
// function checkCookie() {
//     var user=getCookie("username");
//     if (user != "") {
//         alert("Welcome again " + user);
//         document.write("Hello, " + user + "!");
//     } else {
//         user = prompt("Please enter your name:","");
//         if (user != "" && user != null) {
//             setCookie("username", user, 30);
//         }
//     }
// }