import { InMemoryDbService } from 'angular-in-memory-web-api';

export class DbService implements InMemoryDbService {
  createDb() {
    const data = [
      { id: 0, service: "mode", value: 'automatic' }, // 'automatic' 'manual'
      { id: 1, service: "light", value: 'off' }, // 'on' 'off'
      { id: 2, service: "air", value: 'off' }, // 'on' 'off'
      { id: 3, service: "person", value: '0' }, // number
      { id: 4, service: "temperature", value: '0' } // number
    ];
    return { data };
  }
}
