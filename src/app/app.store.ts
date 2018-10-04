//import { IMainFolder } from './MainFolder';
import * as actions from './app.actions';
import { FolderNode } from './models/folder-node.model';

export interface IAppState {
	mainFolder:							Object,
	isLoading:							Boolean,
	searchString: 					string,
	shouldMatchCase:				Boolean,
	currentFolderContents:	Array<Object>,
	itemInfo:								Object,
	activeFolderNode:				FolderNode,
	folderTree:							FolderNode,
}

export const INITIAL_STATE: IAppState = {
	mainFolder: 						{ 'type':'empty'},
	isLoading:							true,
	searchString:						'',
	shouldMatchCase:				false,
	currentFolderContents:	[],
	itemInfo:								null,
	activeFolderNode:				null,
	folderTree:							null,
}

export function rootReducer(state: IAppState, actions): IAppState {
	
	switch (actions.type) {
		case 'SET_IS_LOADING_TO_FALSE':
			return Object.assign({}, state, {
				isLoading:		actions.isLoading
			});
			
		case 'SET_IS_LOADING_TO_TRUE':
			return Object.assign({}, state, {
				isLoading:		actions.isLoading
			});
			
		case 'UPDATE_MAIN_FOLDER':
			return Object.assign({}, state, {
				mainFolder:		actions.mainFolder
			});
			
		case 'TOOGLE_MATCH_CASE':
			return Object.assign({}, state, {
				shouldMatchCase:	!state.shouldMatchCase
			});
			
		case 'UPDATE_SEARCH_STRING':
			return Object.assign({}, state, {
				searchString: actions.searchString
			});
			
		case 'UPDATE_CURRENT_FOLDER_CONTENTS':
			return Object.assign({}, state, {
				currentFolderContents:  actions.currentFolderContents
			});
			
		case 'UPDATE_ITEM_INFO':
			return Object.assign({}, state, {
				itemInfo:		actions.itemInfo
			});
			
		case 'UPDATE_FOLDER_TREE':
			return Object.assign({}, state, {
				folderTree:		actions.folderTree
			});
			
		case 'UPDATE_ACTIVE_FOLDER_BY_NODE':
			return Object.assign({}, state, {
				activeFolderNode:				actions.activeFolderNode,
				currentFolderContents:  actions.currentFolderContents
			});
			
		case 'UPDATE_ACTIVE_FOLDER_NODE_BY_ID':
			return Object.assign({}, state, {
				activeFolderNode:				actions.activeFolderNode,
				currentFolderContents:  actions.currentFolderContents
			});
	}
	
	return state;
}