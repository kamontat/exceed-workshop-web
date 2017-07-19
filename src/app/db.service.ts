import { InMemoryDbService } from 'angular-in-memory-web-api';

export class DbService implements InMemoryDbService {
  createDb() {
    const data = [
      { id: 0, service: "mode", value: 'auto' }, // 'auto' 'manual'
      { id: 1, service: "light", value: 'off' }, // 'on' 'off'
      { id: 2, service: "person", value: '0' }, // number
      { id: 3, service: "light", value: 'off' }, // 'on' 'off'
      { id: 4, service: "temp", value: '0' } // number
    ];
    return { data };
  }
}
