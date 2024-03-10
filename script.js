function rollStats() {
    const characterName = document.getElementById('characterName').value;
    let rolledStats = [];
    for (let i = 0; i < 6; i++) {
        rolledStats.push(rollDice());
    }

    let rolledStatsHtml = '<ul>';
    rolledStats.forEach((stat, index) => {
        rolledStatsHtml += `<li class="draggable" draggable="true" id="stat-${index}" ondragstart="drag(event)">${stat.score}, DM${stat.dm >= 0 ? '+' : ''}${stat.dm}</li>`;
    });
    rolledStatsHtml += '</ul>';

    document.getElementById('rolledStats').innerHTML = rolledStatsHtml;

    const stats = ['strength', 'dexterity', 'endurance', 'intelligence', 'education', 'socialStatus'];
    let statsHtml = '<ul>';
    stats.forEach(stat => {
        statsHtml += `<li>${stat.charAt(0).toUpperCase() + stat.slice(1)}: <div class="drop-target" ondrop="drop(event)" ondragover="allowDrop(event)" data-stat="${stat}"></div></li>`;
    });
    statsHtml += '</ul>';

    document.getElementById('stats').innerHTML = statsHtml;
}


    let rolledStatsHtml = '<ul>';
    rolledStats.forEach((stat, index) => {
        rolledStatsHtml += `<li class="draggable" draggable="true" id="stat-${index}" ondragstart="drag(event)">${stat}</li>`;
    });
    rolledStatsHtml += '</ul>';

    document.getElementById('rolledStats').innerHTML = rolledStatsHtml;

    const stats = ['strength', 'dexterity', 'endurance', 'intelligence', 'education', 'socialStatus'];
    let statsHtml = '<ul>';
    stats.forEach(stat => {
        statsHtml += `<li>${stat.charAt(0).toUpperCase() + stat.slice(1)}: <div class="drop-target" ondrop="drop(event)" ondragover="allowDrop(event)" data-stat="${stat}"></div></li>`;
    });
    statsHtml += '</ul>';

    document.getElementById('stats').innerHTML = statsHtml;


function rollDice() {
    const score = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    const dm = Math.floor(score / 3) - 2;
    return { score, dm };
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);
}

function acceptStats() {
    const stats = ['strength', 'dexterity', 'endurance', 'intelligence', 'education', 'socialStatus'];
    const acceptedStats = {};
    stats.forEach(stat => {
        const dropTarget = document.querySelector(`[data-stat="${stat}"]`);
        if (dropTarget.firstChild) {
            const statText = dropTarget.firstChild.textContent;
            const [score, dm] = statText.split(', ');
            acceptedStats[stat] = { score: parseInt(score), dm: dm };
        } else {
            acceptedStats[stat] = { score: 'Not Set', dm: 'DM0' };
        }
    });

    // Update the summary section
    let summaryHtml = `<h2>Character Summary</h2><pre>`;
    summaryHtml += `Name: ${document.getElementById('characterName').value}\n`;
    for (const [key, value] of Object.entries(acceptedStats)) {
        summaryHtml += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value.score}, ${value.dm}\n`;
    }
    summaryHtml += `</pre>`;
    document.getElementById('characterSummary').innerHTML = summaryHtml;
}


