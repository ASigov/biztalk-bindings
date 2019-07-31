import express from 'express';
import multer from 'multer';
import debug from 'debug';
import parseBindings from './parser/parseBindings';

const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();
const formDataHandler = multer();
const log = debug('app');

app.use(express.static('dist/client'));

app.post(
  '/upload',
  formDataHandler.single('file'),
  async (req, res): Promise<void> => {
    const bindings = await parseBindings(req.file.buffer);
    res.json(bindings);
  },
);

app.listen(port, (): void => log(`Listening on ${port} port ...`));
