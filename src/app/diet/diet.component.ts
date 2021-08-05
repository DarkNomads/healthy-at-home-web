import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit {

  constructor() { }

  faTrash = faTrash;

  meal_types: any = [ 
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Other" 
  ];

  diets: any = [];
  meal: any = {};

  calorieGoal: number = 0;

  selectedDiet: any = null;
  editDiet: any = null;
  editing: boolean = false;
  entering: boolean = false;

  ngOnInit(): void {
    if( localStorage.getItem( 'user' ) ) {
      let user: any = localStorage.getItem( 'user' );
      this.calorieGoal = parseFloat( JSON.parse( user ).calorie_goal );
    }
    if( localStorage.getItem( 'diets' ) ) {
      this.diets = localStorage.getItem( 'diets' );
      this.diets = JSON.parse( this.diets );
    }
  }

  getAverage() {
    if( this.diets.length == 0 ) { return -1; }
    if( this.editing && this.diets.length == 1 ) { return -1; }
    else {
      let total = 0;
      let count = 0;
      this.diets.forEach( ( diet: any ) => {
        if( this.editing && diet === this.diets ) {}
        else {
          total += parseFloat( diet.total_calories );
          count += 1;
        }
      });
      return ( total / count ).toFixed( 1 );
    }
  }

  selectDiet( diet: any ) {
    if( this.editing ) { return; }
    if( this.entering ) { return; }
    this.selectedDiet = diet;
  }

  onCreateEntry() {
    if( this.editing ) { return; }
    var newDate;
    if( this.diets.length == 0 ) {
      newDate = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    }
    else {
      newDate = new Date( this.diets[0].date );
      newDate.setDate( newDate.getDate() + 1 );
      newDate = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
    }
    let newDiet: any = { 
      date: newDate, 
      total_calories: 0, 
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
      other: [], 
    };
    this.diets.unshift( newDiet );
    this.selectedDiet = newDiet;
    this.editDiet = JSON.parse( JSON.stringify( this.selectedDiet ) );
    this.editing = true;
  }

  onEdit() {
    this.editing = true;
    this.editDiet = JSON.parse( JSON.stringify( this.selectedDiet ) );
  }

  onSubmit() {
    this.diets.forEach( ( diet: any ) => {
      if( this.editDiet.date == diet.date && diet !== this.selectedDiet ) { 
        this.diets.splice( this.diets.indexOf( diet ) , 1 );
      }
    });
    this.diets[this.diets.indexOf( this.selectedDiet )] = JSON.parse( JSON.stringify( this.editDiet ) );
    this.selectedDiet = null;
    this.editDiet = null;
    this.editing = false;
    this.diets.sort( ( first: any, second: any ) => {
      return Date.parse( second.date ) - Date.parse( first.date );
    } )
    localStorage.setItem( 'diets', JSON.stringify( this.diets ) );
  }

  onCancel() {
    this.selectedDiet = null;
    this.editDiet = null;
    this.editing = false;
  }

  onDelete() {
    this.diets.splice( this.diets.indexOf( this.selectedDiet ) , 1 );
    this.selectedDiet = null;
    this.editDiet = null;
    this.editing = false;
    localStorage.setItem( 'diets', JSON.stringify( this.diets ) );
  }

  onCreateMeal() {
    if( this.entering ) { return; }
    this.entering = true;
    this.meal = {
      name: "New Meal",
      date: this.selectedDiet.date,
      meal_type: "Breakfast",
      calories: 0,
      servings: 1
    }
    this.selectedDiet = null;
  }

  onSubmitMeal() {
    if( this.meal.servings == 0 ) { this.entering = false; return; }
    this.diets.forEach( ( diet: any ) => {
      if( this.meal.date == diet.date ) {
        diet.total_calories += ( parseFloat( this.meal.calories ) * parseFloat( this.meal.servings ) );
        switch( this.meal.meal_type ) {
          case "Breakfast": {
            this.diets[this.diets.indexOf( diet )].breakfast.unshift( this.meal );
            break;
          }
          case "Lunch": {
            this.diets[this.diets.indexOf( diet )].lunch.unshift( this.meal );
            break;
          }
          case "Dinner": {
            this.diets[this.diets.indexOf( diet )].dinner.unshift( this.meal );
            break;
          }
          case "Snack": {
            this.diets[this.diets.indexOf( diet )].snack.unshift( this.meal );
            break;
          }
          case "Other": {
            this.diets[this.diets.indexOf( diet )].other.unshift( this.meal );
            break;
          }
        }
      }
      this.entering = false;
      localStorage.setItem( 'diets', JSON.stringify( this.diets ) );
    });
  }

  onRemoveMeal( meal: any ) {
    this.editDiet.total_calories -= ( meal.calories *  meal.servings );
    switch( meal.meal_type ) {
      case "Breakfast": {
        this.editDiet.breakfast.splice( this.editDiet.breakfast.indexOf( meal ), 1 );
        break;
      }
      case "Lunch": {
        this.editDiet.lunch.splice( this.editDiet.lunch.indexOf( meal ), 1 );
        break;
      }
      case "Dinner": {
        this.editDiet.dinner.splice( this.editDiet.dinner.indexOf( meal ), 1 );
        break;
      }
      case "Snack": {
        this.editDiet.snack.splice( this.editDiet.snack.indexOf( meal ), 1 );
        break;
      }
      case "Other": {
        this.editDiet.other.splice( this.editDiet.other.indexOf( meal ), 1 );
        break;
      }
    }
  }

  onDeleteMeal() {
    this.entering = false;
  }

}
