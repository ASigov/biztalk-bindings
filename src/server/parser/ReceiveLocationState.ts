export default class ReceiveLocationState {
  public name: string;

  public address: string;

  public adapterName: string;

  public constructor(name: string) {
    this.name = name;
    this.address = '';
    this.adapterName = '';
  }
}
