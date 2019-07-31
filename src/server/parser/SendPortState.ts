export default class SendPortState {
  public name: string;

  public address: string;

  public applicationName: string;

  public constructor(name: string) {
    this.name = name;
    this.address = '';
    this.applicationName = '';
  }
}
