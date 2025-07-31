export class CollectionItemView<K,V>
{
    
    private _value : V;
    public get value() : V {
        return this._value;
    }
    public set value(v : V) {
        this._value = v;
    }
    
    private _key : K;
    public get key() : K {
        return this._key;
    }
    public set key(v : K) {
        this._key = v;
    }
    
}
export class SelectItemView extends CollectionItemView<number, string>
{
    constructor(id:number, label:string)
    {
        super();
        this.key = id;
        this.value = label;
    }
}

export class SelectStringItemView extends CollectionItemView<string, string>
{
    constructor(key:string, label:string)
    {
        super();
        this.key = key;
        this.value = label;
    }
}