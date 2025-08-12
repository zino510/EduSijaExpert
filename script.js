// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Quiz questions
const questions = [
    {
        question: "What is the capital city of Indonesia?",
        options: ["Jakarta", "Surabaya", "Bandung", "Yogyakarta"],
        correct: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Brain", "Liver", "Skin"],
        correct: 3
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Cu"],
        correct: 2
    },
    {
        question: "Which country is home to the Great Barrier Reef?",
        options: ["Brazil", "Australia", "Indonesia", "Thailand"],
        correct: 1
    },
    {
        question: "What is the main component of the Sun?",
        options: ["Helium", "Oxygen", "Carbon", "Hydrogen"],
        correct: 3
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answers = new Array(questions.length).fill(null);

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizContainer = document.getElementById('quiz-container');
const resultsScreen = document.getElementById('results-screen');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const progressBar = document.querySelector('.progress-bar');
const currentQuestionNumber = document.getElementById('current-question');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

// Event Listeners
document.getElementById('start-quiz').addEventListener('click', startQuiz);
document.getElementById('retry-quiz').addEventListener('click', resetQuiz);
prevButton.addEventListener('click', showPreviousQuestion);
nextButton.addEventListener('click', handleNextButton);

function startQuiz() {
    welcomeScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    showQuestion(0);
}

function showQuestion(index) {
    currentQuestion = index;
    const question = questions[index];
    
    // Update progress
    updateProgress();
    
    // Update question number
    currentQuestionNumber.textContent = index + 1;
    
    // Show/hide navigation buttons
    prevButton.classList.toggle('hidden', index === 0);
    nextButton.textContent = index === questions.length - 1 ? 'Finish' : 'Next';
    
    // Display question
    questionElement.textContent = question.question;
    
    // Clear and create option buttons
    optionsElement.innerHTML = '';
    question.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.className = `option-button ${answers[index] === i ? 'selected' : ''}`;
        button.textContent = option;
        button.addEventListener('click', () => selectOption(i));
        optionsElement.appendChild(button);
    });
}

function selectOption(optionIndex) {
    answers[currentQuestion] = optionIndex;
    const options = optionsElement.children;
    
    // Update selected state
    Array.from(options).forEach((button, i) => {
        button.classList.toggle('selected', i === optionIndex);
    });
}

function showPreviousQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

function handleNextButton() {
    if (currentQuestion === questions.length - 1) {
        showResults();
    } else {
        showQuestion(currentQuestion + 1);
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResults() {
    // Calculate score
    score = answers.reduce((total, answer, index) => {
        return total + (answer === questions[index].correct ? 1 : 0);
    }, 0);
    
    // Hide quiz container and show results
    quizContainer.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    // Update score display
    const scorePercentage = (score / questions.length) * 100;
    const scoreCircle = document.querySelector('.score-circle');
    scoreCircle.style.setProperty('--percentage', `${scorePercentage}%`);
    scoreCircle.setAttribute('data-score', `${score}/8`);
    
    document.getElementById('final-score').textContent = score;
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    answers.fill(null);
    resultsScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
}

// Initialize AOS on dynamic content
document.addEventListener('DOMContentLoaded', () => {
    AOS.refresh();
});