import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberSubscription:Subscription;
  customSubscription:Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000);
    this.numberSubscription = myNumbers.subscribe((number:number)=>{
      console.log(number);
    });

    const myObservable = Observable.create((observer:Observer<string>)=>{
      setTimeout(()=>{ observer.next('first package'); },2000);
      setTimeout(()=>{ observer.next('second package'); },4000);
      //setTimeout(()=>{ observer.error('error'); },6000);
      setTimeout(()=>{ observer.complete(); },8000);
    });

    this.customSubscription = myObservable.subscribe(
      (data:string)=> { console.log(data); },
      (error:string)=> { console.log(error)},
      ()=>{console.log('completed')}
    )
    
  }


  ngOnDestroy(): void {
    this.numberSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }
}
