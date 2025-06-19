document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');
    let currentInput = '';
    let operator = null;
    let previousInput = '';
    let resetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if(button.classList.contains('number') || button.classList.contains('decimal')) {
                if(resetDisplay) {
                    currentInput = buttonText;
                    resetDisplay = false;
                } else {
                    //mencegah multiple decimal points
                    if(buttonText === '.' && currentInput.includes('.')) return;
                    currentInput += buttonText;
                }
                display.value = currentInput;
            } else if(button.classList.contains('operator')) {
                if(currentInput === '' && previousInput === '') return; //tidak di mulai dengan operator

                if(previousInput !== '' && operator !== null && !resetDisplay) {
                    calculate();
                }
                operator = buttonText;
                previousInput = currentInput;
                resetDisplay = true;
            } else if(button.classList.contains('equals')) {
                if(currentInput === '' || previousInput === '' || operator === null) return;
                calculate();
                operator = null; //reset operator setelah menghitung
            } else if(button.classList.contains('clear')) {
                currentInput = '';
                operator = null;
                previousInput = '';
                display.value = '';
                resetDisplay = false;
            }
        });
    });

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if(current === 0) {
                    alert("Cannot be divided by 0");
                    currentInput = '';
                    operator = null;
                    previousInput = '';
                    display.value = '';
                    resetDisplay = false;
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        display.value = currentInput;
        previousInput = ''; //menghapus semua kalkulasi
        resetDisplay = true; //siap menerima inputan baru
    }
});
