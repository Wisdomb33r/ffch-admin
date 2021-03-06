import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public routeToFfbeCharacters() {
    this.router.navigate(['ffbe', 'characters']);
  }

  public routeToFfbeSkills() {
    this.router.navigate(['ffbe', 'skills']);
  }

  public routeToFfbeEnhancements() {
    this.router.navigate(['ffbe', 'enhancements']);
  }

  public routeToFfbeLatentSkills() {
    this.router.navigate(['ffbe', 'latent-skills']);
  }

  public routeToFfbeItems() {
    this.router.navigate(['ffbe', 'items']);
  }

  public routeToFfbeRecipes() {
    this.router.navigate(['ffbe', 'recipes']);
  }
}
