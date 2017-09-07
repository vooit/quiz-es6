/**
 * Created by wojciechpac on 07.09.2017.
 */

(function() {
    const myQuestions = [
        {
            question: "Which of the following statements is correct?",
            answers: {
                A: "Real GDP is the total market value of the final goods and services produced in America for sale in a year valued in the prices of 1992",
                B: "Your buying stock in the stock market is an example of investment spending",
                C: "Potential Real GDP is always greater than Equilibrium Real GDP",
                D: "Social security and welfare are examples of spending on infrastructure"
            },
            correctAnswer: "A"
        },
        {
            question: "The period of the business cycle in which real GDP is increasing is called the",
            answers: {
                A: "expansion",
                B: "Peak",
                C: "Recession",
                D: "Stagflation"
            },
            correctAnswer: "A"
        },
        {
            question: "Assume that, in the population, 95 million people worked for pay last week, 5 million people did not work for pay but had been seeking a job, 5 million people did not work for pay and had not been seeking a job for the past several months, and 45 million were under age 16.  The unemployment rate, given these numbers, is",
            answers: {
                A: "5%",
                B: "8%",
                C: "10%",
                D: "20%"
            },
            correctAnswer: "A"
        },
        {
            question: "A type of unemployment in which workers are in-between jobs or are searching for new and better jobs is called _______ unemployment",
            answers: {
                A: "frictional",
                B: "Cyclical",
                C: "Structral",
                D: "Turnover"
            },
            correctAnswer: "A"
        },
        {
            question: "Consider three consumer goods: 100 of Good A, 100 of Good B, and 100 of Good C.  In the base year, Good A sold at a price of $1, Good B sold at a price of $1, and Good C sold at a price of $1.  In the current year, Good A sold at a price of $3, Good B sold at a price of $5, and Good C sold at a price of $10.  The Consumer Price Index (CPI) for the current year is:?",
            answers: {
                A: "100",
                B: "300",
                C: "500",
                D: "600"
            },
            correctAnswer: "D"
        },
        {
            question: "Which of the following is a loser from unexpected inflation?",
            answers: {
                A: "workers with COLAs",
                B: "the middle class ",
                C: "people who own Treasury Bills",
                D: "people who own homes and have fixed-rate mortgages"
            },
            correctAnswer: "C"
        },
        {
            question: "If the nominal interest rate on a checking account is 2% and the inflation rate is 3% this year, the real interest rate is:",
            answers: {
                A: "5%",
                B: "2%",
                C: "2/3%",
                D: "-1%"
            },
            correctAnswer: "D"
        },
        {
            question: "Which of the following would cause the demand curve for automobiles to shift to the left?",
            answers: {
                A: "an increase in the price of the automobiles",
                B: "an increase in the interest rate paid to borrow money to pay for the automobile",
                C: "an increase in buyers' incomes",
                D: "an increase in the cost of production of automobiles"
            },
            correctAnswer: "B"
        },
        {
            question: "Suppose it is announced that industry analysts are predicting that decreased oil supplies from Iraq will cause gasoline prices to rise, beginning next month.  In the current week, the announcement would:",
            answers: {
                A: "shift the supply of gasoline right",
                B: "shift the demand for gasoline right",
                C: "shift the demand for gasoline left",
                D: "have no effect on the demand or supply of gasoline"
            },
            correctAnswer: "B"
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


/* ----------- TIMER ----------- */

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
// if there's a cookie with the name myClock, use that value as the deadline
if(document.cookie && document.cookie.match('myClock')){
    // get deadline value from cookie
    var deadline = document.cookie.match(/(^|;)myClock=([^;]+)/)[2];
}

// otherwise, set a deadline 10 minutes from now and
// save it in a cookie with that name
else{
    // create deadline 10 minutes from now
    var timeInMinutes = 60;
    var currentTime = Date.parse(new Date());
    var deadline = new Date(currentTime + timeInMinutes*60*1000);

    // store deadline in cookie for future reference
    document.cookie = 'myClock=' + deadline + '; path=/; domain=tcafe.net';
}
initializeClock('clockdiv', deadline);
var timeInMinute = setTimeout(myFunction, 3600000);
function myFunction() {
    alert('Time up');
}


function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
        document.write("Hello, " + user + "!");
    } else {
        user = prompt("Please enter your name:","");
        if (user != "" && user != null) {
            setCookie("username", user, 30);
        }
    }
}