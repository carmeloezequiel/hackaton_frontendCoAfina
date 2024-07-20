import { Routes } from '@angular/router';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import { DetectionPageComponent } from './pages/detection-page/detection-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

import path from 'path';


export const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'detection', component: DetectionPageComponent},
  {path:'about', component: AboutComponent},
  {path:'contact', component: ContactComponent}

];
