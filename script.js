class Calculator {
    constructor(prevOpText,currentOpText){
        this.prevOpText = prevOpText;
        this.currentOpText = currentOpText;
        this.clear();
    }

    clear(){
        this.prevOp = '';
        this.currentOp = '';
        this.op = undefined;
    }

    appendNum(num){
        if (num === '.' && this.currentOp.includes('.')) {
        } else {
            this.currentOp = this.currentOp.toString() + num.toString();
        }
        return        
    }

    doOperation(op){
        if (this.currentOp === ''){
        } else if (this.prevOp !== ''){
            this.compute();
            this.op = op;
            this.prevOp = this.currentOp;
            this.currentOp = '';
        } else {
            this.op = op;
            this.prevOp = this.currentOp;
            this.currentOp = '';
        }
        return;
    }

    negate(){
        if (this.currentOp === ''){
        } else {
            let negative = parseFloat(this.currentOp)*(-1);
            this.currentOp = negative.toString();
        }
        return;
    }

    percent(){
        if (this.currentOp === '' || this.prevOp === ''){
        } else {
            let percent = parseFloat(this.prevOp) * parseFloat(this.currentOp) / 100;
            this.currentOp = percent.toString();
        }
        return;
    }

    compute(){
        let computation;
        let prev = parseFloat(this.prevOp);
        let current = parseFloat(this.currentOp);
        if (isNaN(prev) || isNaN(current)){
        } else {
            switch (this.op){
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '×':
                    computation = prev * current;
                    break;
                case '÷' :
                    computation = prev / current;
                    break;
                default:
                    break;
            }

            this.currentOp = computation;
            this.op = undefined;
            this.prevOp = '';
        }
    }

    updateDisplay(){
        this.currentOpText.innerText = this.currentOp;

        if (this.op != null){
            this.prevOpText.innerText = `${this.prevOp} ${this.op}`;
        } else {
            this.prevOpText.innerText = this.prevOp;
        }

    }
}

const numButton = document.querySelectorAll('[data-num]');
const opButton = document.querySelectorAll('[data-op]');
const negateButton = document.querySelector('[data-negate]');
const percentButton = document.querySelector('[data-percent]');
const acButton = document.querySelector('[data-ac]');
const equalButton = document.querySelector('[data-equal]');
const prevOpText = document.querySelector('[data-prev-op]');
const currentOpText = document.querySelector('[data-current-op]');

const awesomeCalculator = new Calculator(prevOpText, currentOpText);

numButton.forEach(button => {
    button.addEventListener('click', () => {
        awesomeCalculator.appendNum(button.innerText);
        awesomeCalculator.updateDisplay();
    })
});

opButton.forEach(button => {
    button.addEventListener('click', () => {
        awesomeCalculator.doOperation(button.innerText);
        awesomeCalculator.updateDisplay();
    })
})

equalButton.addEventListener('click', button => {
    awesomeCalculator.compute();
    awesomeCalculator.updateDisplay();
})

acButton.addEventListener('click', button =>{
    awesomeCalculator.clear();
    awesomeCalculator.updateDisplay();
})

negateButton.addEventListener('click', button =>{
    awesomeCalculator.negate();
    awesomeCalculator.updateDisplay();
})

percentButton.addEventListener('click', button =>{
    awesomeCalculator.percent();
    awesomeCalculator.compute();
    awesomeCalculator.updateDisplay();
})

window.addEventListener("keydown", function(e){
    var keyCode = e.key;
    console.log(e.key);
    switch(e.key){
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            awesomeCalculator.appendNum(e.key);
            awesomeCalculator.updateDisplay();
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            awesomeCalculator.doOperation(e.key);
            awesomeCalculator.updateDisplay();
            break;
        case '%':
            awesomeCalculator.percent();
            awesomeCalculator.compute();
            awesomeCalculator.updateDisplay();
            break;
        case '=':
        case 'Enter':
            awesomeCalculator.compute();
            awesomeCalculator.updateDisplay();
            break;
        case '!':
            awesomeCalculator.negate();
            awesomeCalculator.updateDisplay();
            break;
        case 'Backspace':        
            awesomeCalculator.clear();
            awesomeCalculator.updateDisplay();
            break; 
        default:
            break;
    }
    return; 
});



