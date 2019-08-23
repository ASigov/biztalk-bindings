import express from 'express';
import multer from 'multer';
import parse from './parser';
import map from './mapper';
import write from './writer';
import { Application } from '../shared/model';

const port = process.env.PORT || 3000;
const app = express();
const formDataHandler = multer();

app.use(express.static('dist/client'));
app.use(express.json());

app.post(
  '/upload',
  formDataHandler.single('file'),
  async (req, res): Promise<void> => {
    const state = await parse(req.file.buffer);
    const bindings = map(state);
    res.json(bindings);
  },
);

app.post('/generate', (req, res): void => {
  const application = req.body as Application;
  res.attachment('BindingInfo.xml');
  write(application, res);
  res.end();
});

app.listen(port);
