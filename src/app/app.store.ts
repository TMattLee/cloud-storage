import { IMainFolder } from './MainFolder';
import * as actions from './app.actions';

export interface IAppState {
	mainFolder:		Object,
	isLoading:		Boolean,
}

export const INITIAL_STATE: IAppState = {
	mainFolder: { 'type':'empty'},
	isLoading:	true,
}

export function rootReducer(state: IAppState, actions): IAppState {
	
	switch (actions.type) {
		case 'SET_IS_LOADING_TO_FALSE':
			return Object.assign({}, state, {
				isLoading:		actions.isLoading
			});
			
		case 'UPDATE_MAIN_FOLDER':
			return Object.assign({}, state, {
				mainFolder:		actions.mainFolder
			});
	}
	
	return state;
}