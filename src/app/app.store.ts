//import { IMainFolder } from './MainFolder';
import * as actions from './app.actions';

export interface IAppState {
	mainFolder:							Object,
	isLoading:							Boolean,
	searchString: 					string,
	shouldMatchCase:				Boolean,
	currentFolderContents:	Array<Object>,
	itemInfo:								Object
}

export const INITIAL_STATE: IAppState = {
	mainFolder: 						{ 'type':'empty'},
	isLoading:							true,
	searchString:						'',
	shouldMatchCase:				false,
	currentFolderContents:	[],
	itemInfo:								null,
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
			})
	}
	
	return state;
}