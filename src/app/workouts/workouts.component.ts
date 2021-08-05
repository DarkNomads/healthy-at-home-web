import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  faCheck = faCheck;

  workouts: any = [];
  addedWorkouts: any = [];

  selectedWorkout: any = null;
  editWorkout: any = null;
  editing: boolean = false;
  started: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if( localStorage.getItem( 'workouts' ) ) {
      this.workouts = localStorage.getItem( 'workouts' );
      this.workouts = JSON.parse( this.workouts );
    }
    else {
      this.workouts = [
        { name: "Pushups", reps: 30, sets: 3, description: "A conditioning exercise performed in a prone position by raising and lowering the body with the straightening and bending of the arms while keeping the back straight and supporting the body on the hands and toes." },
        { name: "Pullups", reps: 5, sets: 3, description: "A challenging upper body exercise where you grip an overhead bar and lift your body until your chin is above that bar." },
        { name: "Deadlifts", reps: 3, sets: 3, description: "A movement where your hips hinge backward to lower down and pick up a weighted barbell or kettlebell from the floor." }
      ];
      localStorage.setItem( 'workouts', JSON.stringify( this.workouts ) );
    }
  }

  selectWorkout( workout: any ) {
    if( this.editing ) { return; }
    this.selectedWorkout = workout;
  }

  onCreate() {
    if( this.editing ) { return; }
    let newWorkout: any = { name: "New Workout", reps: 0, sets: 0, description: "Enter a description for your new workout!" };
    this.workouts.unshift( newWorkout );
    this.selectedWorkout = newWorkout;
    this.editWorkout = JSON.parse( JSON.stringify( this.selectedWorkout ) );
    this.editing = true;
  }

  onEdit() {
    this.editing = true;
    this.editWorkout = JSON.parse( JSON.stringify( this.selectedWorkout ) );
  }

  onSubmit() {
    this.workouts[this.workouts.indexOf( this.selectedWorkout )] = JSON.parse( JSON.stringify( this.editWorkout ) );
    this.onRemove();
    this.selectedWorkout = null;
    this.editWorkout = null;
    this.editing = false;
    localStorage.setItem( 'workouts', JSON.stringify( this.workouts ) );
  }

  onCancel() {
    this.selectedWorkout = null;
    this.editWorkout = null;
    this.editing = false;
  }

  onDelete() {
    this.workouts.splice( this.workouts.indexOf( this.selectedWorkout ) , 1 );
    this.onRemove();
    this.selectedWorkout = null;
    this.editWorkout = null;
    this.editing = false;
    localStorage.setItem( 'workouts', JSON.stringify( this.workouts ) );
  }

  isAdded( workout: any ) {
    if( this.addedWorkouts.indexOf( workout ) == -1 ) {
      return false;
    }
    return true;
  }

  onAdd() {
    if( this.addedWorkouts.indexOf( this.selectedWorkout ) == -1 ) {
      this.addedWorkouts.unshift( this.selectedWorkout );
    }
  }

  onRemove() {
    if( this.addedWorkouts.indexOf( this.selectedWorkout ) != -1 ) {
      this.addedWorkouts.splice( this.addedWorkouts.indexOf( this.selectedWorkout ) , 1 );
      if( this.addedWorkouts.length == 0 ) {
        this.onEnd();
      }
    }
  }

  onStart() {
    if( this.editing || this.addedWorkouts.length == 0 ) { return; }
    this.started = true;
  }

  onEnd() {
    this.started = false;
    this.addedWorkouts = [];
  }


}
