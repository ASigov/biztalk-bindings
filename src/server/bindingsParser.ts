import { Parser } from 'node-expat';

class ReceivePort {
  public name: string;

  public applicationName: string;

  public receiveLocations: ReceiveLocation[] = [];

  public constructor(name: string) {
    this.name = name;
    this.applicationName = '';
  }
}

class ReceiveLocation {
  public name: string;

  public constructor(name: string) {
    this.name = name;
  }
}

class SendPort {
  public name: string;

  public applicationName: string;

  public constructor(name: string) {
    this.name = name;
    this.applicationName = '';
  }
}

class BindingsContext {
  public currentReceivePort: ReceivePort | undefined;

  public currentReceiveLocation: ReceiveLocation | undefined;

  public currentSendPort: SendPort | undefined;

  public receivePorts: ReceivePort[] = [];

  public sendPorts: SendPort[] = [];

  private path: string[] = [];

  public pathPush(name: string): void {
    this.path.push(name);
  }

  public pathPop(): string | undefined {
    return this.path.pop();
  }

  public pathEndsWith(path: string[]): boolean {
    if (this.path.length < path.length) {
      return false;
    }
    const skip = this.path.length - path.length;
    for (let i = 0; i < path.length; i += 1) {
      if (this.path[skip + i] !== path[i]) {
        return false;
      }
    }
    return true;
  }
}

const parseBindings = async (data: Buffer): Promise<BindingsContext> =>
  new Promise<BindingsContext>((resolve, reject): void => {
    const parser = new Parser('UTF-8');
    const context = new BindingsContext();
    parser
      .on('startElement', (name, attr): void => {
        if (name === 'SendPort' && attr.Name) {
          const sp = new SendPort(attr.Name);
          context.currentSendPort = sp;
          context.sendPorts.push(sp);
        } else if (name === 'ReceivePort' && attr.Name) {
          const rp = new ReceivePort(attr.Name);
          context.currentReceivePort = rp;
          context.receivePorts.push(rp);
        } else if (
          name === 'ReceiveLocation' &&
          attr.Name &&
          context.currentReceivePort
        ) {
          const rl = new ReceiveLocation(attr.Name);
          context.currentReceiveLocation = rl;
          context.currentReceivePort.receiveLocations.push(rl);
        }
        context.pathPush(name);
      })
      .on('endElement', (): void => {
        context.pathPop();
      })
      .on('text', (text): void => {
        if (
          context.pathEndsWith(['SendPort', 'ApplicationName']) &&
          context.currentSendPort
        ) {
          context.currentSendPort.applicationName = text;
        } else if (
          context.pathEndsWith(['ReceivePort', 'ApplicationName']) &&
          context.currentReceivePort
        ) {
          context.currentReceivePort.applicationName = text;
        }
      })
      .on('end', (): void => {
        resolve(context);
      })
      .on('error', (error): void => {
        reject(error);
      });
    parser.write(data);
    parser.end();
  });

export default parseBindings;
