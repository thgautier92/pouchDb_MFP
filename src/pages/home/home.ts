import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import PouchDB from 'pouchdb-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  db: any;
  dbDocs:any=null;
  msg: any;
  err: any;
  syncDb: any=null;
  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {
    this.db = new PouchDB('my_database');
    console.dir(this.db);
    this.sync();
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Info News',
      subTitle: 'Une mise à jour a eu lieu.Actualiser la liste de vos documents',
      buttons: ["J'ai compris."]
    });
    alert.present();
    setTimeout(()=>{ 
      this.getLocalDoc();
      alert.dismiss();
   }, 3000);
  }
  sync() {
    this.syncDb = PouchDB.sync('my_database', 'http://gsaexp:gsaexp@cdb.gautiersa.fr/todos', {
      live: true,
      retry: true
    }).on('change', (info) => {
      // handle change
      this.msg = info;
      if (info.change.ok){
        this.showAlert();
      }
    }).on('paused', (err) => {
      // replication paused (e.g. replication up to date, user went offline)
      this.err = err;
    }).on('active', () => {
      // replicate resumed (e.g. new changes replicating, user went back online)
    }).on('denied', (err) => {
      // a document failed to replicate (e.g. due to permissions)
      this.err = err;
    }).on('complete', (info) => {
      // handle complete
      this.msg = info;
    }).on('error', (err) => {
      // handle error
      this.err = err;
    });
    console.dir(this.syncDb);
  }
  getLocalDoc() {
    this.db.allDocs({
      include_docs: true,
      attachments: false
    }).then( (result)=> {
      // handle result
      console.log(result);
      this.dbDocs = result;
    }).catch( (err)=> {
      console.log(err);
      this.err = err;
    });
  }
  getDbInfo() {
    this.db.info().then((result) => {
      // handle result
      console.log("Info", result);
      this.msg = result;
    }).catch(function (err) {
      console.log(err);
      this.err = err;
    });
  }
}
