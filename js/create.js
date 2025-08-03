document.addEventListener('DOMContentLoaded', () => {
    const createPollForm = document.getElementById('create-poll-form');
    const addOptionBtn = document.getElementById('add-option-btn');
    const optionsContainer = document.getElementById('options-container');
    const shareLinkContainer = document.getElementById('share-link-container');
    const shareLinkInput = document.getElementById('share-link');
    const copyLinkBtn = document.getElementById('copy-link-btn');

    // Add new option input field
    addOptionBtn.addEventListener('click', () => {
        const newOptionInput = document.createElement('input');
        newOptionInput.type = 'text';
        newOptionInput.classList.add('option');
        newOptionInput.required = true;
        optionsContainer.appendChild(newOptionInput);
    });

    // Handle form submission
    createPollForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const question = document.getElementById('question').value;
        const options = Array.from(document.querySelectorAll('.option'))
                             .map(input => input.value.trim())
                             .filter(value => value);

        if (question && options.length >= 2) {
            const pollData = {
                question: question,
                options: {}
            };

            options.forEach(option => {
                pollData.options[option] = 0; // Initialize votes to 0
            });

            // Push data to Firebase
            const newPollRef = database.ref('polls').push();
            newPollRef.set(pollData)
                .then(() => {
                    const pollId = newPollRef.key;
                    const pollUrl = `https://test-user.github.io/polling-app/vote.html?id=${pollId}`;

                    shareLinkInput.value = pollUrl;
                    shareLinkContainer.style.display = 'block';
                    createPollForm.style.display = 'none';
                })
                .catch(error => {
                    console.error("Error creating poll: ", error);
                    alert("There was an error creating the poll. Please try again.");
                });
        } else {
            alert('Please fill in the question and at least two options.');
        }
    });

    // Copy share link to clipboard
    copyLinkBtn.addEventListener('click', () => {
        shareLinkInput.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    });
});
