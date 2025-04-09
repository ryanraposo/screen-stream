const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const uuid = require('uuid'); // Used to generate unique stream IDs

const app = express();
const port = 8044; // Change port to 8044

// Serve static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Dictionary to store active streams (this would store media stream information in a real app)
const activeStreams = {};

// Serve the stream on a dynamic URL (e.g., /stream/{streamId})
app.get('/stream/:streamId', (req, res) => {
    const streamId = req.params.streamId;

    if (activeStreams[streamId]) {
        // For now, just return the streamId to simulate the stream.
        // Real streaming would involve WebRTC signaling.
        res.send(`Stream with ID: ${streamId} is active`);
    } else {
        res.status(404).send('Stream not found');
    }
});

// Start HTTP server
const server = app.listen(port, () => {
    const serverUrl = `http://localhost:${port}`;
    console.log(`Web server running at ${serverUrl}`);
    console.log(`You can access the app via this link: ${serverUrl}`);
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
});

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log("New connection established");

    // Generate a unique stream ID for the session
    const streamId = uuid.v4(); // Unique session identifier
    const streamUrl = `http://localhost:${port}/stream/${streamId}`; // Direct URL for the stream

    // Store the active stream in the dictionary
    activeStreams[streamId] = { url: streamUrl };

    // Notify the client about the stream URL
    ws.send(JSON.stringify({ type: 'streamUrl', url: streamUrl }));

    // Broadcast messages or handle stream logic
    ws.on('message', (message) => {
        console.log("Message received: ", message);

        // Broadcast the message to all connected clients (except sender)
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log("Connection closed");
    });

    // Handle WebSocket errors
    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
});
