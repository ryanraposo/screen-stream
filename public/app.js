// Establish WebSocket connection
const socket = new WebSocket('ws://localhost:8044');

// Handle WebSocket messages
socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === 'streamUrl') {
        // Show the direct URL for the stream after starting
        document.getElementById('stream-url').textContent = `Stream available at: ${message.url}`;
    }
};

// UI for starting the screen sharing
const startSharingButton = document.getElementById('start-sharing');
const stopSharingButton = document.getElementById('stop-sharing');
const streamUrlElement = document.getElementById('stream-url');

startSharingButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const videoTrack = stream.getVideoTracks()[0];

        // Send stream start message to WebSocket server
        socket.send(JSON.stringify({ type: 'start', videoTrack }));

        // Handle the video stream (optional: display the video locally)
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.play();
        document.body.appendChild(videoElement);
    } catch (err) {
        console.error('Error starting screen sharing:', err);
    }
});

// Stop sharing logic (if needed)
stopSharingButton.addEventListener('click', () => {
    // Stop the video track and close WebSocket connection if needed
    socket.send(JSON.stringify({ type: 'stop' }));
});
