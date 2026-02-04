import initializeApp from './app.js';
import richardsAPI from './movieAPI.js';

const server = initializeApp(richardsAPI);

server.listen(5080);