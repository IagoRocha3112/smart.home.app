import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private status;
  public ligthProperties = {
    label: '',
    btnText: '',
    color: '',
  };
  public state;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.status = this.db.object('ledStatus').valueChanges().subscribe((status: number) => {
      console.log('status: ', status);
      this.state = status;
      if (status === 0) {
        this.ligthProperties = {
          label: 'Luz apagada',
          btnText: 'Acender',
          color: 'success',
        };
      } else {
        this.ligthProperties = {
          label: 'Luz acesa',
          btnText: 'Apagar',
          color: 'danger',
        };
      }
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.status.unsubscribe();
  }

  btnCozinha() {
    if (this.state === 0) {
      this.db.object('ledStatus').set(1);
    } else {
      this.db.object('ledStatus').set(0);
    }
  }

}


