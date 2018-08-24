export const UPDATE_MAIN_FOLDER = 'UPDATE_MAIN_FOLDER';

export const SET_IS_LOADING_TO_FALSE = 'SET_IS_LOADING_TO_FALSE';

export const updateMainFolder = (mainFolder: Object) => ({
	type: 				UPDATE_MAIN_FOLDER,
	mainFolder:	mainFolder
});

export const setIsLoadingToFalse = () => ({
	type: 			SET_IS_LOADING_TO_FALSE,
	isLoading:	false,
});