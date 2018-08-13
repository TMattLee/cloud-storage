import { 
  Component, 
  OnInit,
  OnChanges, 
  SimpleChanges,
  Input  } from '@angular/core';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.css']
})

export class ItemGridComponent implements OnInit, OnChanges {
  
 
  @Input() fileData : Object;
  
  private data: Array<Object>;
  private files: Array<Object>;
  private folders: Array<Object>;

  constructor() { 
    this.files = [];
    this.folders = [];
  }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges){
    const fileData = changes.fileData;
    console.log(fileData);
    
    if(!fileData.currentValue) return;
    
    this.data = fileData.currentValue.contents;
    
    const data: Array<any> = this.data;
    
    if( data ){
      data.forEach( obj => {
        console.log(obj.kind)
        if( obj.kind === 'Folder') this.folders.push(obj);
        if( obj.kind === 'File') this.files.push(obj); 
      })
    }
    
  }
  

}
