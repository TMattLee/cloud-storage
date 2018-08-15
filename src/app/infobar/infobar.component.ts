import { 
  Component, 
  OnInit, 
  Input,
  OnChanges, 
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.css']
})
export class InfobarComponent implements OnInit, OnChanges {
  
  @Input() itemInfo: Object;
  
  private info: Object;
  private haveInfo: Boolean = false;

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges){
    const info = changes.itemInfo.currentValue
    this.info = info;
    console.log('info is ', info)
    if (this.info) this.haveInfo = true;
  }
  
  getFileInfo(event){
    console.log(event)
  }
  
  selectSize(size){
    console.log(size)
    if( size < 1024) return size;
    return Math.floor(size/1024);
  }
  
  isSizeLessThan1024KB(size){
    console.log('checkging... ', size)
  	return (size < 1024)
  }
  

}
