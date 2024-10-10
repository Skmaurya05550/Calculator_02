
window.onload=()=>{
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');

let expression = '';
let result = '';
let lastInput = '';  

themeToggle.addEventListener('change', () => {
    body.classList.toggle('dark');
    
    const themeText = document.querySelector('.theme-text');
    themeText.textContent = themeToggle.checked ? "Switch to Light" : "Switch to Dark";
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'AC') {
            
            expression = '';
            result = '';
            lastInput = '';
        } else if (value === '=') {
            try {
               
                const formattedExpression = expression.replace(/(\d+)%/g, (match, num) => num / 100);
                result = eval(formattedExpression).toString(); 
            } catch (error) {
                result = 'Error';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            
            if (!['+', '-', '*', '/'].includes(lastInput)) {
                expression += value;
            }
        } else if (value === '%') {
            if (/\d$/.test(expression)) {   
                expression += '%';
            }
        } else {
            expression += value;
        }

        lastInput = value;  

        expressionDisplay.textContent = expression;
        resultDisplay.textContent = result;


        if (expression.length > 10 || result.length > 10) {
            expressionDisplay.classList.add('long');
            resultDisplay.classList.add('long');
        } else {
            expressionDisplay.classList.remove('long');
            resultDisplay.classList.remove('long');
        }
    });
});

}







