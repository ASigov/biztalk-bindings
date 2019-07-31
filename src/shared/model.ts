export interface ReceiveLocation {
  name: string;
  address: string;
}

export interface SendPort {
  name: string;
  address: string;
}

export interface Application {
  name: string;
  receiveLocations: ReceiveLocation[];
  sendPorts: SendPort[];
}

export interface Bindings {
  applications: Application[];
}
