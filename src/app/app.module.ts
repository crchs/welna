import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchForYarnComponent } from './search-for-yarn/search-for-yarn.component';
import { SearchForPatternComponent } from './search-for-pattern/search-for-pattern.component';
import { FooterComponent } from './footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PatternFormComponent } from './search-for-pattern/patten-form/pattern-form.component';
import { SpinnerComponent } from './shared-components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { PatternListComponent } from './search-for-pattern/pattern-list/pattern-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SomethingWentWrongComponent } from './shared-components/something-went-wrong/something-went-wrong.component';
import { NoResultsComponent } from './shared-components/no-results/no-results.component';
import { PatternDetailsComponent } from './search-for-pattern/pattern-details/pattern-details.component';
import { PatternDetailsTableComponent } from './search-for-pattern/pattern-details/pattern-details-table/pattern-details-table.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InstructionsPanelComponent } from './shared-components/instructions-panel/instructions-panel.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SearchForYarnComponent,
    SearchForPatternComponent,
    FooterComponent,
    PatternFormComponent,
    SpinnerComponent,
    PatternListComponent,
    SomethingWentWrongComponent,
    NoResultsComponent,
    PatternDetailsComponent,
    PatternDetailsTableComponent,
    InstructionsPanelComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    NgImageSliderModule,
    MatProgressBarModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
