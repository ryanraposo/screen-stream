# Screen Stream

This is a simple web app that allows users to select a screen or window and stream it using WebRTC.

## Files

- `index.html`: The frontend UI for selecting and displaying the shared screen.
- `app.js`: The JavaScript file that handles WebRTC connections and screen capture.
- `server.js`: A simple WebSocket signaling server that facilitates WebRTC connections.
- `package.json`: Node.js project configuration file for dependencies and scripts.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server by running`npm start`.
4. Open`index.html` in a web browser.
5. Click the "Share Screen" button to start streaming your screen or window.

## Notes

- Make sure the WebSocket server is running(`npm start`) before using the app.
- This app supports basic screen sharing and peer-to-peer connections using WebRTC.

## License

MIT License