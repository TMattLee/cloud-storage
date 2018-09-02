export const UPDATE_MAIN_FOLDER = 'UPDATE_MAIN_FOLDER';

export const SET_IS_LOADING_TO_FALSE = 'SET_IS_LOADING_TO_FALSE';
export const SET_IS_LOADING_TO_TRUE = 'SET_IS_LOADING_TO_TRUE';

export const TOOGLE_MATCH_CASE = 'TOOGLE_MATCH_CASE';

export const UPDATE_CURRENT_FOLDER_CONTENTS = 'UPDATE_CURRENT_FOLDER_CONTENTS';

export const UPDATE_SEARCH_STRING = 'UPDATE_SEARCH_STRING';

export const UPDATE_ITEM_INFO = 'UPDATE_ITEM_INFO';

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