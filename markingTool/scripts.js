// buttons
const addMarksBtn = document.querySelector(".addMarks");
const percentagesBtn = document.querySelector(".percentages");
const gradeBoundsBtn = document.querySelector(".gradeBoundaries");
const modeChange = [addMarksBtn, percentagesBtn, gradeBoundsBtn];

const paramBtn = document.querySelector(".name");

const alertSubmitBtn = document.querySelector(".submitBtn");


// input
const consoleInput = document.querySelector(".consoleInput");
const questionCount = document.querySelector(".questionCount");
const totalMarks = document.querySelector(".totalMarks");

const inputs = document.querySelector(".inputs");

// modal
const modal = document.querySelector(".alertCont");


// modes
let marksTotaler = false;
let percentage = false;
let gradeBounds = false;

const modes = [marksTotaler, percentage, gradeBounds]

// parameters
let questionCountVal = 0;
let totalMarksVal = 0;

let marks = [];


// event listeners
consoleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        console.log(consoleInput.value)

        let totalScore = 0;

        if (modes[0] == true) {
            if (questionCountVal != 0) {
                if (+consoleInput.value) {
                    createDiv(consoleInput.value)
                    marks.push(+consoleInput.value)
                    if (marks.length == questionCountVal) {
                        console.log("R");
                        for (let i = 0; i < marks.length; i++) {
                            totalScore += marks[i];
                        }
                        createDiv(`Total Marks: ${totalScore}/${totalMarksVal}`)

                        if (modes[1] == true) {
                            if (totalMarksVal != 0) {
                                let percentage = totalScore * 100 / totalMarksVal;
                                createDiv(`Percentage: ${percentage}%`);
                            } else {
                                modal.classList.remove("hidden")
                            }
                        }
                        marks = []
                        totalScore = 0;
                    }
                }
            } else {
                modal.classList.remove("hidden");
            }
        }


        if (modes[1] == true && modes[0] == false) {
            if (totalMarksVal != 0) {
                if (+consoleInput.value) {
                    createDiv(`${consoleInput.value}/${totalMarksVal}`)
                    let percentage = consoleInput.value * 100 / totalMarksVal;
                    createDiv(`Percentage: ${percentage}%`)
                }
            } else {
                modal.classList.remove("hidden")
            }
        }
        consoleInput.value = "";
        
        
    }
})

paramBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
})


modeChange.forEach(element => {
    element.addEventListener("click", () => {
        let ord = modeChange.indexOf(element);
        if (modes[ord] == false) {
            modes[ord] = true;
            element.style.color = "#FFC914";

            if (totalMarksVal == 0 && questionCountVal == 0) {
                modal.classList.remove("hidden");
            } 
        } else {
            modes[ord] = false
            element.style.color = "#39393A";
        }
        console.log(modes[ord]);
    })
})

alertSubmitBtn.addEventListener("mousedown", () => {
    let qcVal = questionCount.value
    let tmVal = totalMarks.value
    if (Number.isInteger(+qcVal)) {
        if (questionCount.classList.contains("inputError")) {
            questionCount.classList.remove("inputError")
        }
    } else {
        questionCount.classList.add("inputError")
    }

    if (Number.isInteger(+tmVal)) {
        if (totalMarks.classList.contains("inputError")) {
            totalMarks.classList.remove("inputError")
        }
    } else {
        totalMarks.classList.add("inputError")
    }
    
    if (Number.isInteger(+qcVal) && Number.isInteger(+tmVal)) {
        questionCountVal = +qcVal;
        totalMarksVal = +tmVal;
        console.log("H");
        modal.classList.add("hidden");
    }
});


// functions

const createDiv = (inputText) => {
    const div = document.createElement("div");
    let text = document.createTextNode(inputText);
    div.appendChild(text);
    inputs.appendChild(div)
}
