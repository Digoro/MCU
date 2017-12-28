import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Location} from "@angular/common";
import {HeroService} from "../../service/hero/hero.service";
import "rxjs/add/operator/switchMap";
import {Hero} from "../../model/hero";
import {Validators, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  heroForm = new FormGroup({
    heroName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)]))
  });

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
      .subscribe(hero => this.hero = hero);
  }

  save() {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }

}
