import { ClickEvent } from './click-event.model';

import { EventEmitter } from "@angular/core";
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../app.store';



export class ClickHandlerService {
	itemClicked: EventEmitter<ClickEvent> = new EventEmitter<ClickEvent>();
	doubleClicked: EventEmitter<ClickEvent> = new EventEmitter<ClickEvent>();
	contextMenuClicked: EventEmitter<ClickEvent> = new EventEmitter<ClickEvent>();
	
  constructor(private ngRedux: NgRedux<IAppState>) {
  	
  }

	
	handleClick(itemId, nodeLocation){
		const clickEvent = new ClickEvent(itemId,nodeLocation);
		this.itemClicked.emit(clickEvent)
	}

	handleDoubleClick(itemId, nodeLocation){
		const clickEvent = new ClickEvent(itemId,nodeLocation);
		this.doubleClicked.emit(clickEvent);
	}
	
	handleContextMenu(itemId, nodeLocation){
		const clickEvent = new ClickEvent(itemId,nodeLocation);
		this.contextMenuClicked.emit(clickEvent);
	}
	
}