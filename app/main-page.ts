/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { Observable } from 'data/observable';
import { UserSettings } from './UserSettings';
import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

let userSettings = UserSettings.getInstance();
let mainPageViewModel;
class MainPageViewModel extends Observable{
    public username;
    public dbusername
    constructor(){
        super();
        this.dbusername = userSettings.username;
    }
}
// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <Page>args.object;
    mainPageViewModel = new MainPageViewModel();
    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and TypeScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = mainPageViewModel;
}
export function onTap(){
    userSettings.username = mainPageViewModel.username;
    mainPageViewModel.set("dbusername",userSettings.username);
}