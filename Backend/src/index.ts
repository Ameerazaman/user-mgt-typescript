// import http from 'http';
// import dotenv from 'dotenv';
// import { createServer } from './config/app';
// import socketServer from './config/socketServer';

// dotenv.config();

// const startServer = async () => {
//     try {
//         const app = createServer();
//         const server = http.createServer(app);
//         socketServer(server);
//         const PORT = process.env.PORT || 5000;
//         server.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     } catch (error) {
//         console.error('Error starting server:', error);
//     }
// };

// startServer();
