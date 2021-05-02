import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatternDetailsComponent } from './search-for-pattern/pattern-details/pattern-details.component';
import { SearchForPatternComponent } from './search-for-pattern/search-for-pattern.component';
import { SearchForYarnComponent } from './search-for-yarn/search-for-yarn.component';

const routes: Routes = [
  { path: '', redirectTo: '/schemat', pathMatch: 'full' },
  { path: 'wloczka', component: SearchForYarnComponent },
  // { path: 'schemat', component: SearchForPatternComponent },
  // { path: 'detail/:id', component: PatternDetailsComponent },
  {
    path: 'schemat', component: SearchForPatternComponent,
    children: [
      { path: ':id', component: PatternDetailsComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
