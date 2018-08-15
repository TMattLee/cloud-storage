import { 
  Component, 
  OnInit, 
  OnChanges, 
  SimpleChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
  
import { NestedTreeControl } from '@angular/cdk/tree';

import { MatTreeNestedDataSource } from '@angular/material/tree';

export class FolderNode {
  children:   FolderNode[];
  foldername: string;
  type:       any;
  kind:       string;
  id:         string;
  contents:   Array<Object>;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit, OnChanges {
  
  @Input() mainFolder : Array<Object>;
  
  @Output()
  sendNodeInfoToAppComponentEvent: EventEmitter<Object> = new EventEmitter();
  

  nestedTreeControl: NestedTreeControl<FolderNode>;
  nestedDataSource: MatTreeNestedDataSource<FolderNode>;

  constructor() {
    this.nestedTreeControl = new NestedTreeControl<FolderNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }
  
  hasNestedChild = (_: number, nodeData: FolderNode) => !nodeData.type;

  private _getChildren = (node: FolderNode) => node.children;

  private _fileData: Object;

  //constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges){
    const mainFolder = changes.mainFolder.currentValue;
    const contents = changes.mainFolder.currentValue.contents;
    const newArr = [];
    newArr.push(mainFolder)
    const data = this.buildFileTree([mainFolder],0);
    this.nestedDataSource.data = data;
  }
  
  buildFileTree(arr: Array<Object>, level: number): FolderNode[] {
    let result: FolderNode[] = [];
    
    for (let elem in arr ){
      const obj = arr[elem];
      if( obj.hasOwnProperty('kind') && obj['kind'] === 'Folder'){
        const node = new FolderNode();
        node.foldername = obj['name'];
        node.kind = obj['kind'];
        node.id = obj['_id'];
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
  
}
