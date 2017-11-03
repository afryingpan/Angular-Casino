import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MaterialComponentsModule } from './material-components.module';
import { AppComponent } from './app.component';
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';

import { GameTableComponent } from './components/game-table/game-table.component';
import { ChipsComponent } from './components/chips/chips.component';

import { NotificationsService } from 'angular2-notifications/src/simple-notifications/services/notifications.service';
import { GameService } from './services/game.service';

const appRoutes: Routes = [
	{ path: '', component: GameTableComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		GameTableComponent,
		ChipsComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialComponentsModule,
		RouterModule.forRoot(appRoutes),
		SimpleNotificationsModule.forRoot(),
		PushNotificationsModule
	],
	providers: [
		GameService,
		NotificationsService,
	],
bootstrap: [AppComponent]
})
export class AppModule { }
