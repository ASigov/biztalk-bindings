export default class ReceiveLocationState {
  public name: string;

  public address: string = '';

  public adapterName: string = '';

  public transportTypeData: string = '';

  public constructor(name: string) {
    this.name = name;
  }
}
