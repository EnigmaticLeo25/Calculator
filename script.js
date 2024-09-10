class Calculator{
    constructor(prev,current){
        this.prev = prev;
        this.current = current;
        this.clear()
    }

    clear(){
        this.currentOperand='';
        this.prevOperand='';
        this.operation=undefined;

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number==="." && this.currentOperand.includes('.')) return
        this.currentOperand =  this.currentOperand.toString()+number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand==='') return
        if(this.prevOperand !==''){
            this.compute()
        }
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = ''
    }

    compute(){
        let computation;
        const previous  = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(previous)||isNaN(curr)) return
        switch(this.operation){
            case '+':
                computation = previous + curr;
                break;
            case '-':
                computation = previous - curr;
                break;
            case '*':
                computation = previous * curr;
                break;
            case '÷':
                computation = previous / curr;
                break;
            default:
                return
            }
        this.currentOperand = computation;
        this.operation = undefined;
        this.prevOperand = ''
        
    }

    

    update(){
        this.current.innerText = this.currentOperand;
        if(this.operation!=null){
            this.prev.innerText = `${this.prevOperand} ${this.operation}`
        }
        
    }
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clear = document.querySelector('[data-clear]');
const prev = document.querySelector('[data-prev]');
const current = document.querySelector('[data-current]');

const calculator = new Calculator(prev,current);

numberBtns.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.update()
    })
})

operationBtns.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.update()
    })
})

equals.addEventListener('click',()=>{
    calculator.compute();
    calculator.update();
})

clear.addEventListener('click',()=>{
    calculator.clear();
    calculator.update();
})

deleteBtn.addEventListener('click',()=>{
    calculator.delete();
    calculator.update();
})
