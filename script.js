function getComputerChoice() {
    const options = ['Rock', 'Paper', 'Scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return options[randomNumber];
}

function playRound(playerSelection, computerSelection) {

    // Define rules
    const options = [
        {
            name: 'Rock',
            beats: 'Scissors'
        },
        {
            name: 'Paper',
            beats: 'Rock'
        },
        {
            name: 'Scissors',
            beats: 'Paper'
        }
    ];

    // Identify option chosen by player
    const selectedOption = options.find(el => el.name.toLowerCase() === playerSelection.toLowerCase());

    // Determine result
    const result = {
        result: null,
        message: ''
    }
    if (selectedOption.beats === computerSelection) {
        result.result = 1;
        result.message = `You win! ${selectedOption.name} beats ${computerSelection}`;
    }
    else if (playerSelection.toLowerCase() === computerSelection.toLowerCase()) {
        result.result = 2;
        result.message = `Draw! You both chose ${computerSelection}`;
    }
    else {
        result.result = 0;
        result.message = `You lose! ${computerSelection} beats ${selectedOption.name}`;
    }
    return result;
}

function game() {

    // Scoreboard
    const score = {
        max: 5,
        player: 0,
        computer: 0
    };

    // Play round when user selects an option
    const options = document.querySelectorAll('#choices button');

    options.forEach(option => option.addEventListener('click', handleSelection));

    function handleSelection(e) {

        const round = playRound(e.target.value, getComputerChoice());
        
        console.log(round.message);

        // Adjust score accordingly or replay the round if a draw
        switch (round.result) {
            case 0: // Player loses
                score.computer++;
                break;
            case 1: // Player wins
                score.player++;
                break;
            case 2: // Draw
                break;
        }

        setScoreboard();

        // When the game is complete, announce the winner and start over
        if (score.player >= score.max || score.computer >= score.max) {
            const winner = () => score.player > score.computer ? `You win ${score.player}-${score.computer}!` : `You lose ${score.player}-${score.computer}!`
            alert(winner());
            score.player = 0;
            score.computer = 0;
            setScoreboard();
        }

        function setScoreboard() {
            document.querySelector('#score span').textContent = `${score.player} - ${score.computer}`;
        }
    }
}

game();