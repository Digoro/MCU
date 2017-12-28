import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeroDetailComponent} from "./component/hero-detail/hero-detail.component";
import {HeroService} from "./service/hero/hero.service";
import {HeroesComponent} from "./component/heroes/heroes.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {AppRoutingModule} from "./app-routing.module";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./service/in-memory-data/in-memory-data.service";
import {HeroSearchComponent} from "./component/hero-search/hero-search.component";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./service/http-interceptor/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [
    HeroService,
    [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
