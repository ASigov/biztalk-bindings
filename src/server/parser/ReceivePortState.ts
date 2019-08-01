import ReceiveLocationState from './ReceiveLocationState';

export default class ReceivePortState {
  public name: string;

  public applicationName: string = '';

  public receiveLocations: ReceiveLocationState[] = [];

  public constructor(name: string) {
    this.name = name;
  }
}
