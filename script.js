let random = 0;

let container = document.querySelector('#tabellone-container')
let tabellone = document.querySelector('#tabellone')

let btnBox = document.querySelector('#btnBox')
let estraiBtn = document.createElement('button')    // estrazione nums btn
let randomNum = document.createElement('div')   // last num
randomNum.setAttribute('id', 'randomNum')

let formArea = document.querySelector('#formArea')  //  form area
let tabArea = document.querySelector('#tabUser');   // cartelle user area
let qty = 0;    // n cartelle scelte
let arrayCart = [];     // n singola cartella
let arrayTab = [];      // n estratti

let amboNums = []
let ternaNums = []
let quaternaNums = []
let cinquinaNums = []

/* Sounds effects */
const click = new Audio('click.mp3')
const point = new Audio('point.mp3')
const win = new Audio('win.mp3')


/* Creazione form */
function createForm(){
    let form = document.createElement('form')
    let label = document.createElement('p')
    label.innerText = 'Con quante cartelle vuoi giocare? Scegli un numero da 1 a 6'

    // creazione campo input
    let input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('min', '1');
    input.setAttribute('max', '6');

    // box mex
    let mex = document.createElement('p')
    mex.setAttribute('id', 'mex')

    // bottone crea cartelle
    let btn = document.createElement('button')
    btn.innerText= 'START'
    btn.className =  'btn btn-sm'
    btn.addEventListener('click', (e)=>startGame(input, mex, e, btn))

    form.appendChild(label)
    form.appendChild(input);
    form.appendChild(btn);
    form.appendChild(mex)
    formArea.appendChild(form);
}

/* Gioco */
function startGame(input, mex, e, btn){
    e.preventDefault()
    qty = input.value   // numero cartelle

    if(qty==''){
        mex.innerText='Inserisci un numero'
    }else if(qty<1 || qty>6){
        mex.innerText='Scegli un numero di cartelle tra 2 e 6'
    }else{
        createTabellone()
        createExtractionBtn()    
        createCards(qty)
        footer()       
        btn.parentNode.remove()
    }
    
}

/* Creazione tabellone */
function createTabellone(){
    for(let i = 1; i <= 90; i++){
        let num = document.createElement('div')
        num.innerText = i;
        tabellone.appendChild(num)
    }    
}

/* Creazione cartelle */
function createCards(qty){
    for(let i = 1; i<=qty; i++){
        arrayCart = [];     // numeri cartella

        let table = document.createElement('table');    // singola cartella

        // intestazione cartella
        let infoCartella = document.createElement('tr');
        infoCartella.className = 'infoCartella'
        let nCartella = document.createElement('th');   // n cartella
        nCartella.innerText = i
        nCartella.setAttribute('colspan', '1')
        infoCartella.appendChild(nCartella)
        let puntiCartella = document.createElement('th');   // lettere punti
        puntiCartella.innerHTML = `
            <div>
                <span class="ambo">A</span>
                <span class="terna">T</span>
                <span class="quaterna">Q</span>
                <span class="cinquina">C</span>
            </div>`
        puntiCartella.setAttribute('colspan', '8')
        puntiCartella.setAttribute('align', 'right')
        infoCartella.appendChild(puntiCartella)
        table.appendChild(infoCartella)

        // Creazione righe
        for(let j = 1; j<=3; j++){
            let tr = document.createElement('tr');
            const numsRow = []   // array numeri per ogni riga

            // Creazione celle
            for(let k = 1; k<=5; k++){
                do {
                    random = Math.ceil(Math.random() * 90); // generazione random num
                } while (arrayCart.includes(random));   // controllo che nella cartella i numeri non si ripetano

                const tens = Math.floor(random / 10);   // controllo decine random num

                if (!(tens >= 8 && numsRow.some(num => Math.floor(num / 10) >= 8))) {    // controllo che ci sia solo un numero con decina 8 o 9
                    if (!numsRow.some(num => Math.floor(num / 10) === tens)) {   // controllo che nella stessa riga non ci sia più di un numero per decina
                        numsRow.push(random); 
                        arrayCart.push(random);  
                    } else{
                        k--
                    }
                }else{
                    k--
                }
            }

            numsRow.sort((a, b) => Math.floor(a / 10) - Math.floor(b / 10))  // ordina array

            for (let l = 0; l<9; l++){  // aggiunta spazi vuoti dove decine mancanti
                if(numsRow[l]!==''){
                    if (Math.floor(numsRow[l] / 10) === 9) {
                        for (let m = 0; m<9; m++){
                            if(numsRow[m] === 90 && m!=8){   // controllo aggiunta n 90 in decine 8
                                numsRow.splice(l, 0, '')
                            }
                        } 
                    } else if(Math.floor(numsRow[l] / 10) !== l){
                        numsRow.splice(l, 0, '')
                    }
                }
            }

            numsRow.forEach(el => {  // creazione celle
                let td = document.createElement('td');
                td.innerText = el;
                td.className = 'cellaCartella'
                tr.appendChild(td);
            })
            table.appendChild(tr);
        }
        tabArea.appendChild(table);  
    }
}

/* Creazione bottone estrazione numeri */
function createExtractionBtn(){
    estraiBtn.innerText = 'estrai';
    estraiBtn.className = 'estrai'
    estraiBtn.addEventListener('click', numExtraction)
    btnBox.appendChild(estraiBtn)
}

/* Estrazione numero */
function numExtraction(){
    click.play()
        let num = document.querySelectorAll('#tabellone div')   // celle tabellone
        let numCart = document.querySelectorAll('#tabUser td'); // celle  cartelle

        btnBox.appendChild(randomNum)   // last num

        while(true){
            random = Math.ceil(Math.random()*90)    // random num
            if(!arrayTab.includes(random)){
                let div = document.querySelector('#randomNum')
                div.innerHTML = `Ultimo numero: <span>`+random+`</span>`
                num.forEach((ele)=>{
                    if(Number(ele.innerHTML) === random){
                        ele.className = 'selected';
                        arrayTab.push(random)
                    }
                })
                numCart.forEach((ele)=>{
                    if(Number(ele.innerHTML) === random){
                        ele.className = 'selected';
                        punti()
                        tombolaFunc()

                    }
                })
                break;
            }   
        }
}

/* Footer */
function footer(){
    let footer = document.querySelector('footer')

    // Tornare indietro btn
    let btn = document.createElement('button')
    btn.innerText = 'Torna indietro';
    btn.addEventListener('click', ()=>{
        location.reload()
    })

    // Punteggio
    let div = document.createElement('div')
    div.setAttribute('id', 'infoPoints')

    footer.appendChild(div)
    footer.appendChild(btn)
}

function infoPoints(){
    let div = document.querySelector('div#infoPoints')
    if(!ambo && amboNums.length===2){
        let p = document.createElement('p')
        p.innerHTML = 'Ambo: ' + amboNums[0] +', '+amboNums[1]
        div.appendChild(p)
    }else if(!terna && ternaNums.length===3){
        let p = document.createElement('p')
        p.innerHTML = 'Terna: ' + ternaNums[0] +', '+ternaNums[1]+', '+ternaNums[2]
        div.appendChild(p)
    }else if(!quaterna && quaternaNums.length===4){
        let p = document.createElement('p')
        p.innerHTML = 'Quaterna: ' + quaternaNums[0] +', '+quaternaNums[1]+', '+quaternaNums[2]+', '+quaternaNums[3]
        div.appendChild(p)
    }else if(!cinquina && cinquinaNums.length===5){
        let p = document.createElement('p')
        p.innerHTML = 'Cinquina: ' + cinquinaNums[0] +', '+cinquinaNums[1]+', '+cinquinaNums[2]+', '+cinquinaNums[3]+', '+cinquinaNums[4]
        div.appendChild(p)
    }
}


/* Punteggio */
let ambo = false
let terna = false
let quaterna = false
let cinquina = false
let tombola = false

function punti(){
    const rows = document.querySelectorAll('#tabUser table tr') // rows
    rows.forEach(row => {
        // array punti
        const arrayAmbo = []
        const arrayTerna = []
        const arrayQuaterna = []
        const arrayCinquina = []

        const tds = row.querySelectorAll('td');     // celle singola row

        // salta riga se ha già ambo, terna o quaterna
        if (row.id === 'ambo' || row.id === 'terna' || row.id === 'quaterna') {
            return;
        }
        tds.forEach(td => {
            if(arrayTab.includes(Number(td.innerHTML))){
                arrayAmbo.push(td.innerHTML);
                arrayTerna.push(td.innerHTML);
                arrayQuaterna.push(td.innerHTML);
                arrayCinquina.push(td.innerHTML);

                let tableRow = row.closest('table') // cartella genitore della row
        
                if(!ambo && arrayAmbo.length===2){
                   
                    point.play()
                    
                    row.setAttribute('id', 'ambo')
                    row.classList.add('points')
        
                    // lettera relativa al punto nell'intestazione della cartella
                    let amboLetter = tableRow.querySelector('div span.ambo')
                    amboLetter.classList.add('true')
        
                    tds.forEach(td => {
                        if(arrayAmbo.includes(td.innerHTML)){
                            td.classList.add('pointsNum');
                            amboNums.push(td.innerHTML)
                        }
                    });
                    infoPoints()
                    ambo = true
        
                    alert('ambo!')
                }
                if(ambo && !terna && arrayTerna.length===3){
                    point.play()
                    
                    row.setAttribute('id', 'terna')
                    row.classList.add('points')
                    
                    let ternaLetter = tableRow.querySelector('div span.terna')
                    ternaLetter.classList.add('true')
                    
                    tds.forEach(td => {
                        if(arrayTerna.includes(td.innerHTML)){
                            td.classList.add('pointsNum');
                            ternaNums.push(td.innerHTML)
                        }
                    });
                    infoPoints()
                    terna = true
        
                    alert('terna!')
                }
                if(terna && !quaterna && arrayQuaterna.length===4){
                    point.play()
                    
                    row.setAttribute('id', 'quaterna')
                    row.classList.add('points')
                    
                    let quaternaLetter = tableRow.querySelector('div span.quaterna')
                    quaternaLetter.classList.add('true')
                    
                    tds.forEach(td => {
                        if(arrayQuaterna.includes(td.innerHTML)){
                            td.classList.add('pointsNum');
                            quaternaNums.push(td.innerHTML)
                        }
                    });
                    infoPoints()
                    quaterna = true
        
                    alert('quaterna!')
                }
                if(quaterna && !cinquina && arrayCinquina.length===5){
                    point.play()
                    
                    row.setAttribute('id', 'cinquina')
                    row.classList.add('points')
                    
                    let cinquinaLetter = tableRow.querySelector('div span.cinquina')
                    cinquinaLetter.classList.add('true')
                    
                    tds.forEach(td => {
                        if(arrayCinquina.includes(td.innerHTML)){
                            td.classList.add('pointsNum');
                            cinquinaNums.push(td.innerHTML)
                        }
                    });
                    infoPoints()
                    cinquina = true
        
                    alert('cinquina!')
                }
            }
        });
        
    })
}

/* Tombola */
function tombolaFunc(){
    const tables = document.querySelectorAll('#tabUser table')
    tables.forEach(table => {
        const arrayTombola = []
        const tds = table.querySelectorAll('td');
        tds.forEach(td =>{
            if(cinquina && !tombola && arrayTab.includes(Number(td.innerHTML))){
                arrayTombola.push(td.innerHTML)
                if(arrayTombola.length===15){
                    win.play()
                    tombola = true
                    table.setAttribute('id', 'tombola')
                    disableButton(estraiBtn)
                    alert('tombola')
                }
            }
        })
    })
}
const disableButton = (button) => {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    newButton.classList.add('disabledBtn');
}

createForm()