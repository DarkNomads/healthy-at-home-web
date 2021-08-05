import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.scss']
})
export class SleepComponent implements OnInit {

  constructor() { }

  sleepDays: any = [];

  sleepGoal: number = 0;

  selectedSleep: any = null;
  editSleep: any = null;
  editing: boolean = false;
  

  ngOnInit(): void {
    if( localStorage.getItem( 'user' ) ) {
      let user: any = localStorage.getItem( 'user' );
      this.sleepGoal = parseFloat( JSON.parse( user ).sleep_goal );
    }
    if( localStorage.getItem( 'sleepDays' ) ) {
      this.sleepDays = localStorage.getItem( 'sleepDays' );
      this.sleepDays = JSON.parse( this.sleepDays );
    }
  }

  getAverage() {
    if( this.sleepDays.length == 0 ) { return -1; }
    if( this.editing && this.sleepDays.length == 1 ) { return -1; }
    else {
      let total = 0;
      let count = 0;
      this.sleepDays.forEach( ( day: any ) => {
        if( this.editing && day === this.selectedSleep ) {}
        else {
          total += parseFloat( day.hours );
          count += 1;
        }
      });
      return ( total / count ).toFixed( 1 );
    }
  }

  selectSleep( sleep: any ) {
    if( this.editing ) { return; }
    this.selectedSleep = sleep;
  }

  onCreate() {
    if( this.editing ) { return; }
    var newDate;
    if( this.sleepDays.length == 0 ) {
      newDate = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    }
    else {
      newDate = new Date( this.sleepDays[0].date );
      newDate.setDate( newDate.getDate() + 1 );
      newDate = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
    }
    let newSleep: any = { date: newDate, hours: 0 };
    this.sleepDays.unshift( newSleep );
    this.selectedSleep = newSleep;
    this.editSleep = JSON.parse( JSON.stringify( this.selectedSleep ) );
    this.editing = true;
  }

  onEdit() {
    this.editing = true;
    this.editSleep = JSON.parse( JSON.stringify( this.selectedSleep ) );
  }

  onSubmit() {
    this.sleepDays.forEach( ( day: any ) => {
      if( this.editSleep.date == day.date && day !== this.selectedSleep ) { 
        this.sleepDays.splice( this.sleepDays.indexOf( day ) , 1 );
      }
    });
    this.sleepDays[this.sleepDays.indexOf( this.selectedSleep )] = JSON.parse( JSON.stringify( this.editSleep ) );
    this.selectedSleep = null;
    this.editSleep = null;
    this.editing = false;
    this.sleepDays.sort( ( first: any, second: any ) => {
      return Date.parse( second.date ) - Date.parse( first.date );
    } )
    localStorage.setItem( 'sleepDays', JSON.stringify( this.sleepDays ) );
  }

  onCancel() {
    this.selectedSleep = null;
    this.editSleep = null;
    this.editing = false;
  }

  onDelete() {
    this.sleepDays.splice( this.sleepDays.indexOf( this.selectedSleep ) , 1 );
    this.selectedSleep = null;
    this.editSleep = null;
    this.editing = false;
    localStorage.setItem( 'sleepDays', JSON.stringify( this.sleepDays ) );
  }

}
