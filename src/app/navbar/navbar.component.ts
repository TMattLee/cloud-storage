import { 
  Component, 
  OnInit, 
  OnChanges, 
  SimpleChanges,
  Input } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnChanges {
  
  @Input() fileData : Object;
  
  private _fileData: Object;

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges){
    const fileData = changes.fileData;
    console.log(fileData);
    this._fileData = fileData.currentValue;
  }
  

}
