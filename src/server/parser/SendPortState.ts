export default class SendPortState {
  public name: string;

  public address: string;

  public adapterName: string;

  public applicationName: string;

  public constructor(name: string) {
    this.name = name;
    this.address = '';
    this.adapterName = '';
    this.applicationName = '';
  }
}
