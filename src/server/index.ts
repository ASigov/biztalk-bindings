import express from 'express';
import multer from 'multer';
import debug from 'debug';
import { Application, SendPort, ReceiveLocation } from '../shared/bindings';
import parseBindings from './bindingsParser';

const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();
const formDataHandler = multer();
const log = debug('biztalk-bindings:server');

app.use(express.static('dist/client'));
app.use(express.static('node_modules/react/umd'));
app.use(express.static('node_modules/react-dom/umd'));
app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('node_modules/bootstrap/dist/js'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/bs-custom-file-input/dist'));

app.post(
  '/upload',
  formDataHandler.single('file'),
  async (req, res): Promise<void> => {
    const context = await parseBindings(req.file.buffer);
    const bindings = {
      applications: context.receivePorts
        .map((rp): string => rp.applicationName)
        .concat(context.sendPorts.map((sp): string => sp.applicationName))
        .filter((val, index, self): boolean => self.indexOf(val) === index)
        .map(
          (name): Application => ({
            name,
            sendPorts: context.sendPorts
              .filter((sp): boolean => sp.applicationName === name)
              .map(
                (sp): SendPort => ({
                  name: sp.name,
                }),
              )
              .sort((left, right): number =>
                left.name.localeCompare(right.name),
              ),
            receiveLocations: context.receivePorts
              .filter((rp): boolean => rp.applicationName === name)
              .map((rp): ReceiveLocation[] => rp.receiveLocations)
              .reduce((prev, curr): ReceiveLocation[] => prev.concat(curr), [])
              .sort((left, right): number =>
                left.name.localeCompare(right.name),
              ),
          }),
        )
        .sort((left, right): number => left.name.localeCompare(right.name)),
    };

    res.json(bindings);
  },
);

app.listen(port, (): void => log(`Listening on ${port} port ...`));
