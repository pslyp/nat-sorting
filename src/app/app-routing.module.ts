import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Components
import { HomeComponent } from "./home/home.component";
import { TotalComponent } from "./total/total.component";
import { ReceivedComponent } from "./received/received.component";
import { SortingComponent } from "./sorting/sorting.component";
import { NoPageFoundComponent } from "./no-page-found/no-page-found.component";

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'total', pathMatch: 'prefix', component: TotalComponent },
    { path: 'received', pathMatch: 'prefix', component: ReceivedComponent },
    { path: 'sorting', pathMatch: 'prefix', component: SortingComponent },
    { path: '**', component: NoPageFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }