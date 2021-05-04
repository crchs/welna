import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _wasInstructionsPanelSeen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  /* Instructions Panel shown only on first opening of the app */
  setInstructionsPanelSeen(): void {
    this._wasInstructionsPanelSeen.next(true);
  }

  getInstructionsPanelSeen(): Observable<boolean> {
    return this._wasInstructionsPanelSeen.asObservable();
  }

  /* */
}
