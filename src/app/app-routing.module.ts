import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchForPatternComponent } from './search-for-pattern/search-for-pattern.component';
import { SearchForYarnComponent } from './search-for-yarn/search-for-yarn.component';

const routes: Routes = [
  { path: '', redirectTo: '/schemat', pathMatch: 'full' },
  { path: 'wloczka', component: SearchForYarnComponent },
  { path: 'schemat', component: SearchForPatternComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
