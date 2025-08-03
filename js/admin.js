document.addEventListener('DOMContentLoaded', () => {
    const adminPollsContainer = document.getElementById('admin-polls-container');
    const pollsRef = database.ref('polls');

    // Password protection
    const password = prompt("Please enter the admin password:");
    if (password !== "admin") { // Simple password, replace with a more secure method
        adminPollsContainer.innerHTML = "<h1>Access Denied</h1>";
        return;
    }

    pollsRef.on('value', (snapshot) => {
        adminPollsContainer.innerHTML = '';
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const pollId = childSnapshot.key;
                const pollData = childSnapshot.val();

                const pollElement = document.createElement('div');
                pollElement.classList.add('poll');

                const pollQuestion = document.createElement('span');
                pollQuestion.textContent = pollData.question;

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.classList.add('edit-btn');
                editBtn.addEventListener('click', () => editPoll(pollId, pollData.question));

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => deletePoll(pollId));

                pollElement.appendChild(pollQuestion);
                pollElement.appendChild(editBtn);
                pollElement.appendChild(deleteBtn);
                adminPollsContainer.appendChild(pollElement);
            });
        } else {
            adminPollsContainer.textContent = 'No polls to manage.';
        }
    });

    function editPoll(pollId, currentQuestion) {
        const newQuestion = prompt("Enter the new question:", currentQuestion);
        if (newQuestion && newQuestion.trim() !== "") {
            database.ref(`polls/${pollId}/question`).set(newQuestion)
                .then(() => alert("Poll updated successfully!"))
                .catch(error => console.error("Error updating poll: ", error));
        }
    }

    function deletePoll(pollId) {
        if (confirm("Are you sure you want to delete this poll? This action cannot be undone.")) {
            database.ref(`polls/${pollId}`).remove()
                .then(() => alert("Poll deleted successfully!"))
                .catch(error => console.error("Error deleting poll: ", error));
        }
    }
});
