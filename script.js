// Define the character object to store all characteristics, skills, and other attributes that change during character creation.
let character = {
    name: "", // Add this line for the character's name
    characteristics: {
        Str: { score: 0, dm: 0 }, // Strength
        Dex: { score: 0, dm: 0 }, // Dexterity
        End: { score: 0, dm: 0 }, // Endurance
        Int: { score: 0, dm: 0 }, // Intelligence
        Edu: { score: 0, dm: 0 }, // Education
        Soc: { score: 0, dm: 0 }  // Social Standing
    },
    species: "Human", //Species fo the character, later we will create options. 
    homeWorld: {}, //background homeworld of the character
    skills: {}, // Skills are gained and increased during character creation.
    age: 18, // The character's actual age.
    apparentAge: 18, // The character's apparent age, which may be affected by aging and anagathics.
    terms: 0, // The number of terms served in a career.
    benefits: 0, // The number of benefits accrued.
    cash: 0, // The amount of cash available.
    equipment: [], // A list of equipment owned by the character.
    vehicles: [], // A list of vehicles owned by the character.
    socialAssets: [] // A list of rights, privilages, memberships, titles, credit, and other such the character possesses.
};
//ability to switch to the black background with white text of traveller
function toggleTheme() {
    document.body.classList.toggle('classic-theme');
}

// Function to update the dice modifier (dm) for each characteristic based on the current score.
function updateCharacteristics() {
    for (let key in character.characteristics) {
        let characteristic = character.characteristics[key];
        characteristic.dm = Math.floor(characteristic.score / 3) - 2;
    }
}

// Function to update the summary section of the web app with the latest character details.
function updateSummary() {
    updateCharacteristics();
    let summaryContent = document.getElementById('summaryContent');
    summaryContent.innerHTML = `<h3>Name: ${character.name}</h3>`; // Add this line to display the character's name
    summaryContent.innerHTML += `<p>Species: ${character.species}</p>`; // Display the species
    summaryContent.innerHTML += '<h3>Characteristics</h3>';
    for (let key in character.characteristics) {
        let characteristic = character.characteristics[key];
        summaryContent.innerHTML += `<p>${key}: ${characteristic.score} (DM: ${characteristic.dm})</p>`;
    }
    // Add age and apparent age to the summary.
    summaryContent.innerHTML += `<p>Species: ${character.species}</p>`;
    summaryContent.innerHTML += `<p>Homeworld: ${character.homeworld}</p>`;
    summaryContent.innerHTML += `<p>Age: ${character.age}</p>`;
    summaryContent.innerHTML += `<p>Apparent Age: ${character.apparentAge}</p>`;
    summaryContent.innerHTML += `<p>Terms: ${character.terms}</p>`;
    summaryContent.innerHTML += `<p>Benefits: ${character.benefits}</p>`;
    summaryContent.innerHTML += `<p>Cash: ${character.cash}</p>`;
    summaryContent.innerHTML += `<p>Vehicles: ${character.vehicles}</p>`;
    summaryContent.innerHTML += `<p>Social Assets: ${character.socialAssets}</p>`;
    // Add more summary details here (skills, benefits, etc.)
}
//Rolling Dice
function rollDice() {
    let diceResults = document.getElementById('diceResults');
    diceResults.innerHTML = ''; // Clear existing dice before rolling new ones

    for (let i = 0; i < 6; i++) {
        let roll = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 2; // Roll 2D6
        let die = document.createElement('div');
        die.classList.add('die');
        die.setAttribute('draggable', 'true');
        die.setAttribute('ondragstart', 'drag(event)');
        die.setAttribute('data-roll', roll);
        die.innerText = roll;
        diceResults.appendChild(die);
    }
}



function drag(event) {
    event.dataTransfer.setData('text', event.target.dataset.roll);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, characteristic) {
    event.preventDefault();
    var data = event.dataTransfer.getData('text');
    character.characteristics[characteristic].score = parseInt(data);
    updateSummary();

    // Remove the die from the options
    var die = document.querySelector(`.die[data-roll="${data}"]`);
    if (die) {
        die.remove();
    }

    // Change the color of the slot by adding the 'char-slot-filled' class
    var slot = document.querySelector(`#char-${characteristic} .char-slot`);
    if (slot) {
        slot.classList.add('char-slot-filled');
    }
}



function acceptStats() {
    let diceResults = document.getElementById('diceResults');
    diceResults.innerHTML = ''; // Clear the dice results
    // Disable dragging and dropping
    Object.keys(character.characteristics).forEach(key => {
        let characteristicElement = document.getElementById(`char-${key}`);
        characteristicElement.removeAttribute('ondragover');
        characteristicElement.removeAttribute('ondrop');
    });
}
