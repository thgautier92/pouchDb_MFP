import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import Quill from 'quill';
declare var hljs:any;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',

})
export class ContactPage {
  editor: any;
  constructor(public navCtrl: NavController) {
    console.dir(Quill);
  }
  ngOnInit() {
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': ['callibri'] }],
      [{ 'align': [] }],
    
      ['clean']                                         // remove formatting button
    ];
    hljs.configure({   // optionally configure hljs
      languages: ['javascript', 'ruby', 'python']
    });
    var options = {
      debug: 'info',
      modules: {
        toolbar: toolbarOptions,
        history: {
          delay: 2000,
          maxStack: 500,
          userOnly: true
        },
        syntax: true,              // Include syntax module
      },
      placeholder: 'Rédigez votre texte...',
      readOnly: false,
      theme: 'snow'
    };
    this.editor = new Quill('#editor', options);
  }
}
