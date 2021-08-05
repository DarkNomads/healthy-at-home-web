import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router ) { }

  routines: any = 0;
  dietEntries: any = 0;
  sleepEntries: any = 0;
  calorieGoal: any = 2200;
  sleepGoal: any = 8;

  ngOnInit(): void {
    if( localStorage.getItem( 'workouts' ) ) {
      this.routines = localStorage.getItem( 'workouts' );
      this.routines = JSON.parse( this.routines ).length;
    }

    if( localStorage.getItem( 'diets' ) ) {
      this.dietEntries = localStorage.getItem( 'diets' );
      this.dietEntries = JSON.parse( this.dietEntries ).length;
    }

    if( localStorage.getItem( 'sleepDays' ) ) {
      this.sleepEntries = localStorage.getItem( 'sleepDays' );
      this.sleepEntries = JSON.parse( this.sleepEntries ).length;
    }

    if( localStorage.getItem( 'user' ) ) {
      this.calorieGoal = localStorage.getItem( 'user' );
      this.sleepGoal = JSON.parse( this.calorieGoal ).sleep_goal
      this.calorieGoal = JSON.parse( this.calorieGoal ).calorie_goal;
    }
  }

  routeToWorkouts() {
    this.router.navigate( ['workouts'] )
  }

  routeToDiet() {
    this.router.navigate( ['diet'] )
  }

  routeToSleep() {
    this.router.navigate( ['sleep'] )
  }

}
