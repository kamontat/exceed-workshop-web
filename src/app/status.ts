export class Status {
  id: number;
  value: string;
  constructor(id: number, message: string) {
    this.id = id;
    this.value = message;
  }
}
