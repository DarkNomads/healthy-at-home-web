import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  workouts: any = [
    { name: "Pushups", reps: 10, sets: 3, description: "You push yourself up, without your legs." },
    { name: "Pullups", reps: 5, sets: 3, description: "You pull yourself up, with just your arms." },
    { name: "Squats", reps: 10, sets: 5, description: "You squat, but with a weight on your shoulders."  },
    { name: "Deadlifts", reps: 3, sets: 2, description: "You lift a weight in front of you, using your body." }
  ]

  selectedWorkout: any = null;
  editing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectWorkout( workout: any ) {
    this.editing = false;
    this.selectedWorkout = workout;
  }

  onCreate() {
    let newWorkout: any = { name: "New Workout", reps: 0, sets: 0, description: "Enter a description for your new workout!" };
    this.workouts.unshift( newWorkout );
    this.selectedWorkout = newWorkout;
    this.editing = true;
  }

  onEdit() {
    this.editing = true;
  }

  onSubmit() {
    this.selectedWorkout = null;
    this.editing = false;
  }

  onCancel() {
    this.selectedWorkout = null;
    this.editing = false;
  }

  onDelete() {
    this.workouts.splice( this.workouts.indexOf( this.selectedWorkout ) , 1 );
    this.editing = false;
    this.selectedWorkout = null;
  }

  onStart() {

  }


}
