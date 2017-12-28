import {Injectable} from "@angular/core";
import {Hero} from "../model/hero";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(res => res.json() as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(res => res.json() as Hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http.post(this.heroesUrl, {name: name, image: `image/${name}.png`})
      .toPromise()
      .then(res => res.json() as Hero)
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
    return this.http.get(url).map(res => res.json() as Hero[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('에러 발생', error);
    return Promise.reject(error.message || error);
  }
}
