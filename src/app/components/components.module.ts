import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { IonicModule } from '@ionic/angular';
import { NavigationComponent } from './navigation/navigation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const PAGE_COMPONENTS = [
  SearchComponent,
  NavigationComponent
]

@NgModule({
  declarations: [ PAGE_COMPONENTS ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    PAGE_COMPONENTS,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
