import {Component, OnInit} from "@angular/core";
import {Hero} from "../../model/hero";
import {HeroService} from "../../service/hero/hero.service";
import {Router} from "@angular/router";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  heroForm = new FormGroup({
    heroName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)]))
  });

  constructor(private heroService: HeroService, private router: Router) {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  add(): void {
    let name = this.heroForm.value.heroName;
    if (!name) return;
    name = name.trim();
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      })
  }

  delete(hero: Hero) {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h != hero);
        if (this.selectedHero == hero) this.selectedHero = null;
      })
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
