import SendPortState from './SendPortState';
import ReceiveLocationState from './ReceiveLocationState';
import ReceivePortState from './ReceivePortState';

export default class ParserState {
  private path: string[] = [];

  private currentReceivePort?: ReceivePortState;

  private currentReceiveLocation?: ReceiveLocationState;

  private currentSendPort?: SendPortState;

  public receivePorts: ReceivePortState[] = [];

  public sendPorts: SendPortState[] = [];

  public addSendPort(name: string): void {
    const sp = new SendPortState(name);
    this.currentSendPort = sp;
    this.sendPorts.push(sp);
  }

  public addReceivePort(name: string): void {
    const rp = new ReceivePortState(name);
    this.currentReceivePort = rp;
    this.receivePorts.push(rp);
  }

  public addReceiveLocation(name: string): void {
    if (this.currentReceivePort) {
      const rl = new ReceiveLocationState(name);
      this.currentReceiveLocation = rl;
      this.currentReceivePort.receiveLocations.push(rl);
    }
  }

  public setSPApplicationName(name: string): void {
    if (this.currentSendPort) {
      this.currentSendPort.applicationName = name;
    }
  }

  public setRPApplicationName(name: string): void {
    if (this.currentReceivePort) {
      this.currentReceivePort.applicationName = name;
    }
  }

  public setSPAddress(address: string): void {
    if (this.currentSendPort) {
      this.currentSendPort.address = address;
    }
  }

  public setRLAddress(address: string): void {
    if (this.currentReceiveLocation) {
      this.currentReceiveLocation.address = address;
    }
  }

  public setSPAdapterName(name: string): void {
    if (this.currentSendPort) {
      this.currentSendPort.adapterName = name;
    }
  }

  public setRLAdapterName(name: string): void {
    if (this.currentReceiveLocation) {
      this.currentReceiveLocation.adapterName = name;
    }
  }

  public setSPTransportTypeData(data: string): void {
    if (this.currentSendPort) {
      this.currentSendPort.transportTypeData += data;
    }
  }

  public setRLTransportTypeData(data: string): void {
    if (this.currentReceiveLocation) {
      this.currentReceiveLocation.transportTypeData += data;
    }
  }

  public pathPush(name: string): void {
    this.path.push(name);
  }

  public pathPop(): string | undefined {
    return this.path.pop();
  }

  public pathEndsWith(...path: string[]): boolean {
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
