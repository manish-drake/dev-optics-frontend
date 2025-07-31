import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PAGE_ROUTES } from './pages/routes';

// Import the routes you just defined:

@NgModule({
  imports: [
    RouterModule.forRoot(PAGE_ROUTES, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

