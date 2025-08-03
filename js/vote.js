document.addEventListener('DOMContentLoaded', () => {
    const pollQuestion = document.getElementById('poll-question');
    const voteOptionsContainer = document.getElementById('vote-options-container');
    const voteBtn = document.getElementById('vote-btn');
    const resultsLink = document.getElementById('results-link');

    const pollId = getPollIdFromUrl();

    if (!pollId) {
        pollQuestion.textContent = 'Poll not found.';
        return;
    }

    resultsLink.href = `results.html?id=${pollId}`;
    const pollRef = database.ref(`polls/${pollId}`);

    pollRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            const pollData = snapshot.val();
            pollQuestion.textContent = pollData.question;

            voteOptionsContainer.innerHTML = '';
            Object.keys(pollData.options).forEach(option => {
                const label = document.createElement('label');
                label.classList.add('option-label');

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'vote_option';
                radio.value = option;

                label.appendChild(radio);
                label.appendChild(document.createTextNode(option));
                voteOptionsContainer.appendChild(label);
            });
        } else {
            pollQuestion.textContent = 'This poll does not exist.';
            voteBtn.style.display = 'none';
        }
    });

    voteBtn.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="vote_option"]:checked');
        if (selectedOption) {
            const selectedValue = selectedOption.value;

            // Basic check to prevent multiple votes (more robust solutions are needed for production)
            if (localStorage.getItem(`voted_${pollId}`)) {
                alert("You have already voted in this poll.");
                return;
            }

            const voteRef = database.ref(`polls/${pollId}/options/${selectedValue}`);
            voteRef.transaction((currentVotes) => {
                return (currentVotes || 0) + 1;
            }).then(() => {
                localStorage.setItem(`voted_${pollId}`, 'true');
                window.location.href = `results.html?id=${pollId}`;
            }).catch(error => {
                console.error("Vote submission error: ", error);
                alert("There was an error submitting your vote.");
            });
        } else {
            alert('Please select an option to vote.');
        }
    });
});
