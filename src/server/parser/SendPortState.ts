export default class SendPortState {
  public name: string;

  public address: string = '';

  public adapterName: string = '';

  public transportTypeData: string = '';

  public applicationName: string = '';

  public constructor(name: string) {
    this.name = name;
  }
}
