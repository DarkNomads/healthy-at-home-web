import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editing: Boolean = false;

  user: any;
  editUser: any;

  activity_levels: any = [ "Low", "Moderate", "Intense" ];

  constructor() { }

  ngOnInit(): void {

    if( localStorage.getItem( 'user' ) ) {
      this.user = localStorage.getItem( 'user' );
      this.user = JSON.parse( this.user );
    }
    else {
      this.user = {
        name: "New User",
        height: 0,
        age: 0,
        weight: 0,
        activity_level: "Low",
        sleep_goal: 8,
        calorie_goal: 2200
      }
      localStorage.setItem( 'user', JSON.stringify( this.user ) );
    }
  }

  onEdit() {
    this.editing = true;
    this.editUser = JSON.parse( JSON.stringify( this.user ) );
    this.editUser.height = this.generateReadableHeight( this.editUser.height );
  }

  onSubmit() {
    this.editing = false;
    this.editUser.height = this.generateHeight( this.editUser.height );
    if( isNaN( this.editUser.age ) ) this.editUser.age = this.user.age;
    if( isNaN( this.editUser.weight ) ) this.editUser.weight = this.user.weight;
    if( isNaN( this.editUser.sleep_goal ) ) this.editUser.sleep_goal = this.user.sleep_goal;
    this.user = JSON.parse( JSON.stringify( this.editUser ) );
    localStorage.setItem( 'user', JSON.stringify( this.user ) );
  }

  onCancel() {
    this.editing = false;
    this.editUser = JSON.parse( JSON.stringify( this.user ) );
  }

  generateReadableHeight( height: number ) {
    return `${ Math.floor( height / 12 ) }'${ height % 12 }`;
  }

  generateHeight( height: string ) {
    let match = height.match( /^(\d)'(\d{1,2})$/ );
    if( match != null ) {
      return parseInt( match[1] ) * 12 + parseInt( match[2] );
    }
    else {
      return this.user.height;
    }
    
  }

  generateBMI( height: number, weight: number ) {
    return ( weight / ( height * height )  * 703 ).toFixed(2);
  }

}
