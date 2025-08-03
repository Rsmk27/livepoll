document.addEventListener('DOMContentLoaded', () => {
    const pollsContainer = document.getElementById('polls-container');

    // Reference to the 'polls' node in Firebase
    const pollsRef = database.ref('polls');

    // Listen for changes in the polls data
    pollsRef.on('value', (snapshot) => {
        pollsContainer.innerHTML = ''; // Clear existing polls
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const pollId = childSnapshot.key;
                const pollData = childSnapshot.val();

                const pollElement = document.createElement('div');
                pollElement.classList.add('poll');

                const pollLink = document.createElement('a');
                pollLink.textContent = pollData.question;
                pollLink.href = `vote.html?id=${pollId}`;

                const resultsLink = document.createElement('a');
                resultsLink.textContent = 'View Results';
                resultsLink.href = `results.html?id=${pollId}`;
                resultsLink.classList.add('results-link-btn');

                pollElement.appendChild(pollLink);
                pollElement.appendChild(resultsLink);
                pollsContainer.appendChild(pollElement);
            });
        } else {
            pollsContainer.textContent = 'No polls available yet. Create one!';
        }
    });
});
