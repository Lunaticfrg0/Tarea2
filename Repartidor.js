const fs = require("fs");
const path = require("path")

let arguments = process.argv.slice(2);

let amountOfGroups = parseInt(arguments[2])

let students, topics;

const txtReader = (value) =>{
    let tmp;
    tmp = fs.readFileSync(path.resolve(arguments[value]))
    .toString()
    .split("\r\n");
    tmp = shuffle(tmp)
    return tmp
}
function shuffle(array) {
    return (array.sort(() => Math.random() - 0.5));
  }
  function distributeTeams(students, amountOfGroups){
    let tmp = [];
    let used = [];
    let amountPerGroup = parseInt(students.length/amountOfGroups);
    let Amount = parseInt(students.length%amountOfGroups);

    while(students.length > 0){
        if(students.length <= Amount){
            for(i = 0 ; i < students.length; i++){
                let j = Math.floor(Math.random() * tmp.length);
                if (used.includes(j)){
                    i = -1
                }
                else {
                    tmp[j].push(students.pop());
                }
                used.push(j);
            }
        }
        else {
            tmp.push(students.splice(0, amountPerGroup))
        }
    }
    return tmp
  }
  function checkCapacity(students , amountPerGroup){
    let bool = false;
    if (students.length ===  amountPerGroup){
        bool = true
    }
    return bool;
  }

  function distributeTopics(students, topics, amountOfGroups){
    let tmp = [];
    let used = [];
    let amountPerGroup = (topics.length/amountOfGroups);
    let Amount = parseInt(topics.length%amountOfGroups);
    let j;
    let maxCounter= 0;
    let sameSize = true;


    while(topics.length > 0){

        if(topics.length <= Amount){

            for(i = 0; i < students.length; i++){
                if (i === 0){
                    maxCounter = students[i].length;
                }
                else{
                    if (maxCounter < student[i].length){
                        sameSize = false;
                    }
                }
            }

            for(i = 0 ; i < topics.length; i++){
                if (sameSize === true){
                    j = Math.floor(Math.random() * tmp.length);
                    if (used.includes(j)){
                        i = -1
                    }
                    else {
                    tmp[j].push(topics.pop());
                    }
                }
                else{
                    j = Math.floor(Math.random() * tmp.length);
                if (checkCapacity(students[j],amountPerGroup) ===  true ||used.includes(j)){
                    i = -1
                }
                else {
                    tmp[j].push(topics.pop());
                    }
                }
                used.push(j);
            }
        }
        else {
            tmp.push(topics.splice(0, amountPerGroup))
        }
    }
    return tmp
  }
  function display(students, topics){

    for (i = 0  ; i<  students.length; i++){
        console.log(`Grupo #${i+1}`)
        for(j = 0 ; j< students[i].length; j++){
            console.log(`   Integrante #${j+1} `+ students[i][j])
        }
        for(k = 0 ; k < topics[i].length; k++){
            console.log(`       Tema #${k+1}: `+ topics[i][k])
        }
        console.log("-----------------------------------------------")

    }
  }

if (arguments.length === 3){
    students = txtReader(0);
    topics = txtReader(1);
    tmp1 = distributeTeams(students, amountOfGroups);
    tmp2 = distributeTopics(students, topics, amountOfGroups)

    display(tmp1, tmp2)
}