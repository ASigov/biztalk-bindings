export interface Bindings {
  applications: Application[];
}

export interface Application {
  name: string;
  receiveLocations: ReceiveLocation[];
  sendPorts: SendPort[];
}

export interface ReceiveLocation {
  name: string;
  address: string;
  adapterName: string;
}

export interface SendPort {
  name: string;
  address: string;
  adapterName: string;
}
