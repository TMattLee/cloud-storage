import { 
  Component, 
  OnInit, 
  Input,
  OnChanges, 
  SimpleChanges,
} from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../app.store';

@Component({
  selector: 'app-infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.css']
})
export class InfobarComponent implements OnInit{
  

  @select() itemInfo;
  
  private info: Object;
  private haveInfo: Boolean = false;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux.select( state => state.itemInfo)
      .subscribe( itemInfo => {
        if(itemInfo) this.haveInfo = true;
        this.info = itemInfo;
      });
  }
  
  getFileInfo(event){
  }
  
  selectSize(size){
    if( size < 1024) return size;
    return Math.floor(size/1024);
  }
  
  isSizeLessThan1024KB(size){
  	return (size < 1024)
  }
  
}
