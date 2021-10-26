import { FeedFilm } from './../../shared/models/feed-film.model';
import { FeedFilmsService } from './../../shared/services/feed-films.service';
import { UserService } from './../../shared/services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription, BehaviorSubject, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

interface Claim {
  claim: string;
  value: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

  @Input() sidenav!: MatSidenav;
  isAuthenticated = false;
  userName: any;
  searchs: FeedFilm[] = [];

  private search$ = new BehaviorSubject('');
  private destroy$ = new Subject<void>();

  constructor(
    public router: Router,
    private readonly userService: UserService,
    private feedFilmService: FeedFilmsService
  ) {
    // this.subscriptionAuthenticationState = this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  login() {
    // this.oktaAuth.signInWithRedirect();
  }

  logout() {
    // this.oktaAuth.signOut();
  }

  ngOnInit() {
    this.userName = this.userService.getUserName().preferredUsername;
    if (this.validateEmail(this.userName)) {
      this.isAuthenticated = true;
    }
    this.search$.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((search) => this.searchOnAutomation(search));
  }

  validateEmail(email: string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  toggleMenu() {
    this.sidenav.open();
    // this.sidenavService.toggle();
  }

  onInput(value: string): void {
    this.search$.next(value);
  }

  routeToFilms(id: string) {
    this.router.navigate(['/automation/films', id]);
  }
  searchOnAutomation(search: string) {
    if (search) {
      this.feedFilmService.search(search).subscribe(
        (result) => {
          this.searchs = result
          console.log(this.searchs);
        }
      )
    }
  }


}
