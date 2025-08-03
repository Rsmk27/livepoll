document.addEventListener('DOMContentLoaded', () => {
    const pollQuestion = document.getElementById('poll-question-results');
    const resultsChartCtx = document.getElementById('results-chart').getContext('2d');
    const voteLink = document.getElementById('vote-link');

    const pollId = getPollIdFromUrl();

    if (!pollId) {
        pollQuestion.textContent = 'Poll not found.';
        return;
    }

    voteLink.href = `vote.html?id=${pollId}`;
    const pollRef = database.ref(`polls/${pollId}`);
    let chart;

    pollRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            const pollData = snapshot.val();
            pollQuestion.textContent = pollData.question;

            const labels = Object.keys(pollData.options);
            const data = Object.values(pollData.options);

            if (chart) {
                chart.data.labels = labels;
                chart.data.datasets[0].data = data;
                chart.update();
            } else {
                chart = new Chart(resultsChartCtx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: '# of Votes',
                            data: data,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
        } else {
            pollQuestion.textContent = 'This poll does not exist.';
        }
    });
});
