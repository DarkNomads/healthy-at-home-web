import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  faCheck = faCheck;

  workouts: any = [
    { name: "Pushups", reps: 10, sets: 3, description: "You push yourself up, without your legs." },
    { name: "Pullups", reps: 5, sets: 3, description: "You pull yourself up, with just your arms." },
    { name: "Squats", reps: 10, sets: 5, description: "You squat, but with a weight on your shoulders."  },
    { name: "Deadlifts", reps: 3, sets: 2, description: "You lift a weight in front of you, using your body." }
  ];

  addedWorkouts: any = [];

  selectedWorkout: any = null;
  editWorkout: any = null;
  editing: boolean = false;

  constructor() { }

  ngOnInit(): void {
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
    }
  }

  onStart() {
    if( this.editing ) { return; }
    
  }


}
