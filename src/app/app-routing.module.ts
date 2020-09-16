import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'book',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('./pages/profile/edit/edit.module').then( m => m.EditPageModule)
      }
    ]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'list-booking',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/list-booking/list-booking.module').then( m => m.ListBookingPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./pages/list-booking/booking-details/booking-details.module').then( m => m.BookingDetailsPageModule)
      }
    ]
  },
  {
    path: 'messages',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./pages/messages/details/details.module').then( m => m.DetailsPageModule)
      }
    ]
  },
  {
    path: 'tickets',
    loadChildren: () => import('./pages/tickets/tickets.module').then( m => m.TicketsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
