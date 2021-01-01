const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const layers = [
    [1, 's', 2],
    [2, 's', 2],
    [2, 'p', 6],
    [3, 's', 2],
    [3, 'p', 6],
    [4, 's', 2],
    [3, 'd', 10],
    [4, 'p', 6],
    [5, 's', 2],
    [4, 'd', 10],
    [5, 'p', 6]
];

function find(atomNumber) {

    let i = 0;
    let answer = '';

    function findGroupAndRow(energyLevel, layerName, number){
        if (layerName === 's' || layerName === 'p'){
            console.log(`element row : ${energyLevel}`)
        }else {
            console.log(`element row : ${energyLevel + 1}`)
        }

        switch (layerName) {
            case 's' : {
                const group = number === 0 ? 2 : number;
                console.log(`element group : ${group}`);
                break;
            }
            case 'p': {
                const group = (number === 0 ? 6 : number) + 12;
                console.log(`element group : ${group}`);
                break;
            }
            case 'd': {
                const group = (number === 0 ? 10 : number) + 2;
                console.log(`element group : ${group}`);
                break;
            }
        }
    }

    function findLayers(number){

        let [energyLevel, layerName, layerStorage] = layers[i];

        const submission = number - layerStorage;

        if (submission < 0) {

            if (number !== 0){
                answer = answer + `${energyLevel}${layerName}${number} `;
            }

            console.log(answer);

            if (number === 0) {
                [energyLevel, layerName, _] = layers[i - 1];
            }
            findGroupAndRow(energyLevel, layerName, number);

            return null;
        }

        answer = answer + `${energyLevel}${layerName}${layerStorage} `;

        i++;

        findLayers(submission);
    }

    findLayers(atomNumber);
}

readline.question('gimme atomic number :  ', number => {
    if (+number <= 54){
        find(+number);
    }else {
        console.log('sorry but i cant do it with numbers bigger than 54 :(')
    }
    readline.close();
});
