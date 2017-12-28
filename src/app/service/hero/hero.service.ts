import {Injectable} from "@angular/core";
import {Hero} from "../../model/hero";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(res => res as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(res => res as Hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http.post(this.heroesUrl, {name: name, image: `image/${name}.png`})
      .toPromise()
      .then(res => res as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, hero)
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  search(term: string): Observable<Hero[]> {
    let url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get(url).map(res => res as Hero[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('에러 발생', error);
    return Promise.reject(error.message || error);
  }
}
