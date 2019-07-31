export interface HasName {
  name: string;
}

export interface ReceiveLocation extends HasName {
  address: string;
}

export interface SendPort extends HasName {
  address: string;
}

export interface Application extends HasName {
  receiveLocations: ReceiveLocation[];
  sendPorts: SendPort[];
}

export interface Bindings {
  applications: Application[];
}
