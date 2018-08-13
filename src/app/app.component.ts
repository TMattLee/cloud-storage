import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cloud-storage';
  
  fileData = null;
  
  ngAfterViewInit(){
    console.log('initializing...');
    axios({
      method: 'GET',
      url:'api/getData?username=Dummy%20User',
    })
    .then( response => {
      
      this.fileData = response.data.mainFolder
      console.log(this.fileData)
    })
    .catch( error => console.log( error ));
  }
  
}
