import { InMemoryDbService } from 'angular-in-memory-web-api';

export class DbService implements InMemoryDbService {
  createDb() {
    const data = [
      { id: 0, value: 'automatic' }, // 'automatic' 'manual', service: "mode"
      { id: 1, value: 'off' }, // 'on' 'off', service: "light"
      { id: 2, value: 'off' }, // 'on' 'off', service: "air"
      { id: 3, value: '0' }, // number, service: "person"
      { id: 4, value: '0' } // number, service: "temperature"
    ];
    return { data };
  }
}
