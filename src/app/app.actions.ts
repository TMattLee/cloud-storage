export const UPDATE_MAIN_FOLDER = 'UPDATE_MAIN_FOLDER';

export const SET_IS_LOADING_TO_FALSE = 'SET_IS_LOADING_TO_FALSE';
export const SET_IS_LOADING_TO_TRUE = 'SET_IS_LOADING_TO_TRUE';

export const TOOGLE_MATCH_CASE = 'TOOGLE_MATCH_CASE';

export const UPDATE_CURRENT_FOLDER_CONTENTS = 'UPDATE_CURRENT_FOLDER_CONTENTS';

export const UPDATE_SEARCH_STRING = 'UPDATE_SEARCH_STRING';

export const UPDATE_ITEM_INFO = 'UPDATE_ITEM_INFO';
export const UPDATE_ACTIVE_FOLDER_BY_NODE = 'UPDATE_ACTIVE_FOLDER_BY_NODE';
export const UPDATE_ACTIVE_FOLDER_NODE_BY_ID = 'UPDATE_ACTIVE_FOLDER_NODE_BY_ID';
export const UPDATE_FOLDER_TREE = 'UPDATE_FOLDER_TREE';

export const updateMainFolder = (mainFolder: Object) => ({
	type: 				UPDATE_MAIN_FOLDER,
	mainFolder:	mainFolder
});

export const setIsLoadingToFalse = () => ({
	type: 			SET_IS_LOADING_TO_FALSE,
	isLoading:	false,
});

export const setIsLoadingToTrue = () => ({
	type: 			SET_IS_LOADING_TO_TRUE,
	isLoading:	true,
});

export const toggleMatchCase = () => ({
	type:	  TOOGLE_MATCH_CASE
})

export const updateSearchString = ( inputString ) => ({
	type:	          UPDATE_SEARCH_STRING,
	searchString:	  inputString
})

export const updateCurrentFolderContents = ( currentFolderContents ) => ({
  type:                   UPDATE_CURRENT_FOLDER_CONTENTS,
  currentFolderContents:  currentFolderContents
})

export const updateItemInfo = ( itemInfo ) => ({
  type:       UPDATE_ITEM_INFO,
  itemInfo:   itemInfo
})

export const updateFolderTree = ( folderTree ) => ({
  type:       UPDATE_FOLDER_TREE,
  folderTree: folderTree
})

export const updateActiveFolderByNode = ( node ) => ({
  type:                   UPDATE_ACTIVE_FOLDER_BY_NODE,
  activeFolderNode:       node,
  currentFolderContents:  node.contents
})

export const updateActiveFolderNodeById = ( activeFolderNodeId, folderTree ) => {
  const getNode = (id) => {
    return findNode(id,folderTree);
  }
  
  const findNode = (id, node) => {
    if( node.id === id ) return node;
    if(node.children.length > 0) {
      for(let n of node.children){
        const result  = findNode(id, n);
        if(result.id === id) return result;
      }
    }
  }
  
  const activeFolderNode = getNode(activeFolderNodeId);
  
  return {
    type:                   UPDATE_ACTIVE_FOLDER_NODE_BY_ID,
    activeFolderNode:       activeFolderNode,
    currentFolderContents:  activeFolderNode.contents
  }
}