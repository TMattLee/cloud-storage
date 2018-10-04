import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { 
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';


import { 
  NgRedux, 
  NgReduxModule, 
  DevToolsExtension 
} from '@angular-redux/store';

import { 
  IAppState, 
  rootReducer, 
  INITIAL_STATE 
} from './app.store';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { InfobarComponent } from './infobar/infobar.component';
import { FolderComponent } from './navbar/folder/folder.component';
import { ItemCardComponent } from './item-grid/item-card/item-card.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    ItemGridComponent,
    InfobarComponent,
    FolderComponent,
    ItemCardComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgReduxModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatTreeModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
   constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension) {

    let enhancers = [];

    enhancers = [ ...enhancers, devTools.enhancer() ];

    this.ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [],
      enhancers
    );
  }
}
