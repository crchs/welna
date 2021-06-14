import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private db: AngularFirestore
  ) { }

  // Example only, TBD
  ngOnInit(): void {
    var docRef = this.db.collection("cities");

    docRef.get()
      .subscribe((cities) => {
        cities.forEach((city) => {
          console.log('city', city.id, city.data())
        })
      })

  }
}
