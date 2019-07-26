import express from 'express';
import multer from 'multer';
import debug from 'debug';
import { Application, SendPort, ReceiveLocation } from '../shared/bindings';
import parseBindings from './bindingsParser';

const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();
const formDataHandler = multer();
const log = debug('app');

app.use(express.static('dist/client'));

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
