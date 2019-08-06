import express from 'express';
import multer from 'multer';
import parse from './parser';
import map from './mapper';

const port = process.env.PORT || 3000;
const app = express();
const formDataHandler = multer();

app.use(express.static('dist/client'));

app.post(
  '/upload',
  formDataHandler.single('file'),
  async (req, res): Promise<void> => {
    const state = await parse(req.file.buffer);
    const bindings = map(state);
    res.json(bindings);
  },
);

app.listen(port);
