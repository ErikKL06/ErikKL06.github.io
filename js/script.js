/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner

    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        if (arithmetic !== null) {
            clearLCD();
        }
        addDigit(digit);
        e.target.style.backgroundColor

    } 
    else if (btn === 'comma') { // Inte en siffertangent, övriga tangenter.
        addComma();
    }
    else if (btn !== 'enter' && btn !== 'clear'){
        memory = lcd.value;
        setOperator(btn);
        e.target.style.backgroundColor = 'lightblue';
        console.log("rätt")   
    }
    else if(btn === 'enter'){
        calculate();
        document.getElementById("div").style = 'initial';
        document.getElementById("mul").style = 'initial';
        document.getElementById("add").style = 'initial';
        document.getElementById("sub").style = 'initial';
    }
    else if(lcd.value ===''){
        memClear();
    }
    else{
        clearLCD();
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    lcd.value += digit;
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    lcd.value += '.';
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator){
    if (operator === "add") {
        arithmetic = '+';
        document.getElementById("add").style.backgroundColor = 'lightblue';
    }
    else if(operator === "sub") {
        arithmetic = '-';
        document.getElementById("sub").style.backgroundColor = 'lightblue';
    }
    else if(operator === "div") {
        arithmetic = '/';
        document.getElementById("div").style.backgroundColor = 'lightblue';
    }
    else {
        arithmetic = 'x';
        document.getElementById("mul").style.backgroundColor = 'lightblue';
    }

}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    if (arithmetic === '+') {
        lcd.value = parseFloat(memory) + parseFloat(lcd.value);
        memory = lcd.value;
    }
    else if (arithmetic === '-') {
        lcd.value = parseFloat(memory) - parseFloat(lcd.value);
        memory = lcd.value;
    }
    else if (arithmetic === '/') {
        lcd.value = parseFloat(memory) / parseFloat(lcd.value);
        memory = lcd.value;
    }
    else {
        lcd.value = parseFloat(memory) * parseFloat(lcd.value);
        memory = lcd.value;
    }
}


/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
    console.log("clear")
}

/** Rensar allt, reset */
function memClear(){
    memory = 0;
    arithmetic = null;
    clearLCD();
    console.log("memclear")
}

window.onload = init;
