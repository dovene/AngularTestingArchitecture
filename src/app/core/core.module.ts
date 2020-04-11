import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { MessageService } from './message.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
    imports: [ CommonModule, RouterModule ],
    exports: [ NavBarComponent, RouterModule ],
    declarations: [ NavBarComponent ],
    providers: [ MessageService ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }
}
