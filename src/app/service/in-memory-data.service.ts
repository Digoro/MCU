import {InMemoryDbService} from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {id: 0, name: 'Iron Man', image: "image/Iron-Man.png"},
      {id: 1, name: 'Incredible Hulk', image: "image/Incredible-Hulk.png"},
      {id: 2, name: 'Thor', image: "image/Thor.png"},
      {id: 3, name: 'Captain America', image: "image/Captain-America.png"},
      {id: 4, name: 'Ant Man', image: "image/Ant-Man.png"},
      {id: 5, name: 'Scarlet Witch', image: "image/Scarlet-Witch.png"},
      {id: 6, name: 'Gamora', image: "image/Gamora.png"},
      {id: 7, name: 'Winter Soldier', image: "image/Winter-Soldier.png"},
      {id: 8, name: 'Vision', image: "image/Vision.png"},
      {id: 9, name: 'Black Widow', image: "image/Black-Widow.png"},
      {id: 10, name: 'Hawkeye', image: "image/Hawkeye.png"}
    ];
    return {heroes};
  }
}
