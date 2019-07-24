import express from 'express';
import debug from 'debug';

const app = express();
const log = debug('biztalk-bindings:server');

app.use(express.static('public'));
app.use(express.static('dist/client'));
app.use(express.static('node_modules/react/umd'));
app.use(express.static('node_modules/react-dom/umd'));
app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('node_modules/bootstrap/dist/js'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/bs-custom-file-input/dist'));

app.listen(3000, (): void => log('Listening on port 3000...'));
