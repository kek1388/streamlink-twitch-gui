import { main } from "config";
import { MenuItem } from "nwjs/nwGui";
import nwWindow from "nwjs/Window";
import Menu from "nwjs/Menu";
import { isDarwin } from "utils/node/platform";


const { "display-name": displayName } = main;


export function createNativeMenuBar( routingService ) {
	if ( !isDarwin ) { return; }

	var menubar = Menu.create({ type: "menubar" });
	menubar.createMacBuiltin( displayName );
	menubar = menubar.menu;

	// Add a preferences menu item to the main menubar submenu
	var mainMenu = menubar.items[ 0 ].submenu;
	mainMenu.insert( new MenuItem({ type: "separator" }), 1 );
	var preferences = new MenuItem({
		type: "normal",
		label: "Preferences",
		key: ",",
		modifier: "cmd"
	});
	preferences.click = () => routingService.transitionTo( "settings" );
	mainMenu.insert( preferences, 2 );

	// Add a refresh menu item to the view menubar submenu
	var viewMenu = menubar.items[ 2 ].submenu;
	var refresh = new MenuItem({
		type: "normal",
		label: "Refresh",
		key: "r",
		modifiers: "cmd"
	});
	refresh.click = () => routingService.refresh();
	viewMenu.insert( refresh, 0 );

	nwWindow.menu = menubar;
}
