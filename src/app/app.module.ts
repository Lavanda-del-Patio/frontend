import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './lavanda/components/notfound/notfound.component';
import { ProductService } from './lavanda/service/product.service';
import { CountryService } from './lavanda/service/country.service';
import { CustomerService } from './lavanda/service/customer.service';
import { EventService } from './lavanda/service/event.service';
import { IconService } from './lavanda/service/icon.service';
import { NodeService } from './lavanda/service/node.service';
import { PhotoService } from './lavanda/service/photo.service';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
