export class TypesView{
    
    private _id : number;
    public get id() : number {
        return this._id;
    }
    public set id(v : number) {
        this._id = v;
    }
    
    private _typeName : string;
    public get typeName() : string {
        return this._typeName;
    }
    public set typeName(v : string) {
        this._typeName = v;
    }
    
    private _newType : string;
    public get newType() : string {
        return this._newType;
    }
    public set newType(v : string) {
        this._newType = v;
    }
    
    private _existingTypes : string[];
    public get existingTypes() : string[] {
        return this._existingTypes;
    }
    public set existingTypes(v : string[]) {
        this._existingTypes = v;
    }
    
    private _key : string;
    public get key() : string {
        return this._key;
    }
    public set key(v : string) {
        this._key = v;
    }
    
}