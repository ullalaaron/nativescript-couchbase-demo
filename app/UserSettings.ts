let CouchBaseModule = require("nativescript-couchbase");
import { Models } from './models/Models';

export class UserSettings implements Models.IUserSettings {
    private DATABASE_NAME = 'ns-couchbase-test-db';
    private USER_SETTINGS_DOC_ID = 'usersettings';
    private _database;
    private _userSettingsDocument: Models.IUserSettings;
    private _userSettingsObj: Models.IUserSettings;
    private static _instance :UserSettings;
    private constructor() {
        this._database = new CouchBaseModule.Couchbase(this.DATABASE_NAME);
        this._userSettingsDocument = this._database.getDocument(this.USER_SETTINGS_DOC_ID);
        if (!this._userSettingsDocument) {
            console.log("Document does not exist yet :)");
            this._userSettingsObj = {
                username: "",
                email: "",
                fullname: "",
            }
            this._database.createDocument(this._userSettingsObj, this.USER_SETTINGS_DOC_ID);
            this._userSettingsDocument = this._database.getDocument(this.USER_SETTINGS_DOC_ID);
        }else{
            this._userSettingsObj = this._userSettingsDocument;
            console.dir(this._userSettingsObj);
        }
    }
    public static getInstance() {
        if(!this._instance){
            this._instance = new UserSettings();
        }
        return this._instance;
    }
    get username(): string {
        this._userSettingsObj = this._database.getDocument(this.USER_SETTINGS_DOC_ID);
        let username = this._userSettingsObj.username;
        return username;
    }
    set username(value: string) {
        console.log("called set usernae " + value);
        this._userSettingsObj = this._database.getDocument(this.USER_SETTINGS_DOC_ID);
        this._userSettingsObj.username = value;
        console.dir(this._userSettingsObj);
        this._database.updateDocument(this.USER_SETTINGS_DOC_ID, this._userSettingsObj);
    }
    public get fullname() {
        return "";
    }
    public get email() {
        return "";
    }
}