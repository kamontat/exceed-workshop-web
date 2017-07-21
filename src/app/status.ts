export class Status {
  id: number;
  service: string;
  value: string;

  public update(value: string): void {
    this.value = value;
  }
}
