import { 
  Component, 
  OnInit, 
  OnChanges, 
  SimpleChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
  
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../app.store';

import { NestedTreeControl } from '@angular/cdk/tree';

import { MatTreeNestedDataSource } from '@angular/material/tree';

export class FolderNode {
  children:       FolderNode[];
  foldername:     string;
  type:           any;
  kind:           string;
  id:             string;
  contents:       Array<Object>;
  parentFolderId: any;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit, OnChanges {
  
  @select() mainFolder;
  
  //@Input() mainFolder : Array<Object>;
  
  @Output()
  sendNodeInfoToAppComponentEvent: EventEmitter<Object> = new EventEmitter();
  
  @Output() sendSearchParamsToAppComponentEvent: EventEmitter<Object> = new EventEmitter();

  nestedTreeControl: NestedTreeControl<FolderNode>;
  nestedDataSource: MatTreeNestedDataSource<FolderNode>;
  
  hasNestedChild = (_: number, nodeData: FolderNode) => !nodeData.type;

  private _getChildren = (node: FolderNode) => node.children;

  private _fileData: Object;
  
  private maxLength: number = 20;
  
  private subscription: any;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.nestedTreeControl = new NestedTreeControl<FolderNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }
  
  ngOnInit() {
    this.subscription = this.mainFolder.subscribe( m => {
      console.log('subscription to mainFolder', m)
      const data = this.buildFileTree([m],0);
      this.nestedDataSource.data = data;
    })
  }
  
  ngOnChanges(changes: SimpleChanges){
    console.log(changes)
    if(!changes) return;
    //const mainFolder = changes.mainFolder.currentValue;
    //const contents = changes.mainFolder.currentValue.contents;
    //const newArr = [];
    //newArr.push(mainFolder)
    
  }
  
  buildFileTree(arr: Array<Object>, level: number): FolderNode[] {
    let result: FolderNode[] = [];
    console.log(arr)
    
    for (let elem in arr ){
      const obj = arr[elem];
      if( obj.hasOwnProperty('kind') && obj['kind'] === 'Folder'){
        const node = new FolderNode();
        node.foldername = obj['name'];
        node.kind = obj['kind'];
        node.id = obj['_id'];
        node.parentFolderId = obj['parentFolderId'];
        
        if(obj['contents'] !== null){ 
          node.contents = obj['contents']
          node.children = this.buildFileTree(obj['contents'], level+1);
        }
        else {
          node.type = 'bottom'
        }
        
        result.push(node);
      }
    }
    
    return result;
  }
  
  handleFilenameClick(event, node){
    event.preventDefault();
    this.sendNodeInfoToAppComponentEvent.emit(node.contents);
  }
  
  private itemsFiltered: Boolean = false;
  private matchCaseIndicator: Boolean = false;
  private inputString: string = '';

  filterParent(){
    this.sendSearchParamsToAppComponentEvent.emit({
    	searchString: this.inputString,
    	matchCase: this.matchCaseIndicator,
    });
  }
  
  handleSearchChange(event: any){
  	this.inputString = event.target.value;
  	
    if(this.inputString === ''){
      this.itemsFiltered = false;
    } else {
      this.itemsFiltered = true;
    }
    
    this.filterParent();
  }
  
  handleSliderToggle(event: any){
  	this.matchCaseIndicator = event.checked;
  	this.filterParent();
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
