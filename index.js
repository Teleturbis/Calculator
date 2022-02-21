/************************/
/*      VARIABLES       */
/************************/

let standartBtnColor = "rgb(225,225,225)";
let operatorColor = "rgb(255,205,205)"
let equelColor = "rgb(205,205,255)"

let values = ["C", "input", 7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "/", 0, ",", "=", "x"];
let div;
let historyDiv;

let btnArray = [];

let calcArray = [''];
let historyArray = [];

/************************/
/*         CODE         */
/************************/

createHTML();

/************************/
/*      FUNCTIONS       */
/************************/

function createHTML(){

    let x;
    let headline = document.createElement("h1");

    document.title = "Calculator";

    headline.innerHTML = "Calculator";
    headline.style.textAlign = "center";
    document.body.appendChild(headline);

    div = document.createElement("div");
    div.style.width = "fit-content";
    div.style.heigth = "45%";
    div.style.display = "grid";
    div.style.backgroundColor = "gray";
    div.style.gridTemplateRows = "auto";
    div.style.gridTemplateColumns = "repeat(4, 1fr)";
    div.style.margin = "0 auto";
    div.style.marginTop = "5%";
    div.style.borderRadius = "0.5rem";
    div.className = "calcDiv";
    div.addEventListener("click", btnClicked);
    document.body.appendChild(div);

    historyDiv = document.createElement("div");
    historyDiv.style.width = "15%";
    historyDiv.style.heigth = "20%";
    historyDiv.style.backgroundColor = "tomato";
    historyDiv.style.margin = "0 auto";
    historyDiv.style.marginTop = "5%";
    historyDiv.style.borderRadius = "0.5rem";
    historyDiv.className = "calcDiv";
    historyDiv.addEventListener("click", btnClicked);
    document.body.appendChild(historyDiv);

    for(let i = 0; i < values.length; i++){

        if(values[i] === 0 || values[i] === 1 || values[i] === 2 || values[i] === 3 || values[i] === 4 || values[i] === 5 || values[i] === 6 || values[i] === 7 || values[i] === 8 || values[i] === 9){
            x = document.createElement("input");
            x.id = `ID${i}`;
            x.style.padding = "1rem 2rem";
            x.style.margin = "0.5rem";
            x.type = "button";
            x.style.backgroundColor = standartBtnColor;
            x.value = values[i];
            x.className = "button";
            x.style.borderRadius = "0.5rem"
            div.appendChild(x);

            btnArray.push(x)
        } else if (values[i] === "input"){
            x = document.createElement("input");
            x.type = "text";
            x.id = `ID${i}`;
            x.style.gridColumn = "span 3";
            x.style.width = "70%"
            x.style.padding = "1rem 2rem";
            x.style.margin = "0.5rem auto";
            x.style.borderRadius = "0.5rem"
            x.style.contentEditable = "false"
            div.appendChild(x);

            btnArray.push(x)
        } else {
            x = document.createElement("input");
            x.id = `ID${i}`;
            x.style.padding = "1rem 2rem";
            x.style.margin = "0.5rem";
            x.type = "button";
            x.style.backgroundColor = operatorColor;
            x.value = values[i];
            x.className = "button";
            x.style.borderRadius = "0.5rem"
            div.appendChild(x);

            btnArray.push(x)
            if(values[i] === "="){
                x.style.backgroundColor = equelColor;
            }
        }
    }

}


function btnClicked(e){

    if(e.target.className != "calcDiv"){

        if(e.target.value == 0 || e.target.value == 1 || e.target.value == 2 || e.target.value == 3 || e.target.value == 4 || e.target.value == 5 || e.target.value == 6 || e.target.value == 7 || e.target.value == 8 || e.target.value == 9){

            btnArray[1].value += e.target.value;

        }

        if(e.target.value === "+"){

            calcArray.push(parseFloat(btnArray[1].value));
            calcArray.push("+");
            historyArray.push(btnArray[1].value)
            historyArray.push("+");
            btnArray[1].value = "";

        }

        if(e.target.value === "-"){

            calcArray.push(parseFloat(btnArray[1].value));
            calcArray.push("-");
            historyArray.push(btnArray[1].value)
            historyArray.push("-");
            btnArray[1].value = "";

        }

        if(e.target.value === "x"){

            calcArray.push(parseFloat(btnArray[1].value));
            calcArray.push("*");
            historyArray.push(btnArray[1].value)
            historyArray.push("*");
            btnArray[1].value = "";

        }

        if(e.target.value === "/"){

            calcArray.push(parseFloat(btnArray[1].value));
            calcArray.push("/");
            historyArray.push(btnArray[1].value)
            historyArray.push("/");
            btnArray[1].value = "";

        }

        if(e.target.value === "C"){
            btnArray[1].value = "";
        }

        if(e.target.value === ","){
            btnArray[1].value += ".";
            historyArray.push(".");
        }

        if(e.target.value == "="){

            calcArray.push(parseFloat(btnArray[1].value));
            
            historyArray.push(btnArray[1].value)
            historyArray.push("=");

            btnArray[1].value = "";

            for(let i = 1; i < calcArray.length; i++){

                if(calcArray[i] === "+" || calcArray[i] === "*" || calcArray[i] === "-" || calcArray[i] === "/"){

                    switch(calcArray[i]){

                        case "+":
                            calcArray[i+1] = calcArray[i-1] + calcArray[i+1];
                            break;
        
                        case "-":
                            calcArray[i+1] = calcArray[i-1] - calcArray[i+1];
                            break;
        
                        case "*":
                            calcArray[i+1] = calcArray[i-1] * calcArray[i+1];
                            break;
        
                        case "/":
                            calcArray[i+1] = calcArray[i-1] / calcArray[i+1];
                            break;
        
                            default:
                                break;
        
                    }
            }

            }

            btnArray[1].value = calcArray[calcArray.length-1]
            
            historyArray.push(btnArray[1].value)

            createHistory();

            historyArray = [];

            calcArray = [''];

        }

    }

}


function createHistory(){

    let p = document.createElement("p");
    p.innerHTML = historyArray.join("");
    p.style.padding = "1rem";
    historyDiv.appendChild(p);


}