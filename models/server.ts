export default class Server {
  url: string;
  id: string;
  name: string;
  constructor(pUrl: string, pId: string, pName: string) {
    this.url = pUrl;
    this.id = pId;
    this.name = pName;
  }
}
