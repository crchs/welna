import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchForPatternComponent } from './search-for-pattern/search-for-pattern.component';
import { SearchForYarnComponent } from './search-for-yarn/search-for-yarn.component';

const routes: Routes = [
  { path: '', component: SearchForYarnComponent },
  { path: 'yarn', component: SearchForYarnComponent },
  { path: 'pattern', component: SearchForPatternComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
