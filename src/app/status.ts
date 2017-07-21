export class Status {
  id: number;
  value: string;

  public update(value: string): void {
    this.value = value;
  }
}
