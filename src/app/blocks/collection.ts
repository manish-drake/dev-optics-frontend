

import { Views } from '../app/service/models-interface/interface';
import { EventDispatcher, Handler } from './event-dispatcher'

export interface ItemSelectedEvent<T> {
    selectedItem: T
    selectedItems?: any[];
}
interface ItemAddedEvent<T> {
    item: T
}
interface AddingNewEvent {
    modal: Views.ModalHost
}

export class Range<T> extends Array<T> {

    _rangeObject: string = "1";
    private itemAddedDispatcher = new EventDispatcher<ItemAddedEvent<T>>();
    public onItemAdded(handler: Handler<ItemAddedEvent<T>>, preRun: boolean = false) {
        this.itemAddedDispatcher.register(handler);
        if (preRun)
            this.forEach((item: T) => this.itemAddedDispatcher.fire({ item: item }));
    }

    private addNewDispatcher = new EventDispatcher<AddingNewEvent>();
    public onAddingNewItem(handler: Handler<AddingNewEvent>): void {
        this.addNewDispatcher.register(handler);
    }
    Clear()
        : void {
        this.splice(0, this.length);
    }

    protected OnAdd: { (item: T): void } | null;
    public Add(item: T): number {
        this.push(item);
        this.itemAddedDispatcher.fire({ item: item })
        if (this.OnAdd) this.OnAdd(item)
        return this.length;
    }

    public Remove(item: T): number {
        const idx = this.indexOf(item);
        if (idx >= 0) {
            this.splice(idx, 1);
        }
        return idx;
    }

    public RemoveAt(idx: number): number {
        if ((idx >= 0) && (idx < this.length)) {
            this.splice(idx, 1);
        }
        return idx;
    }

    public AddingNewItem(modal: Views.ModalHost): void {
        this.addNewDispatcher.fire({ modal: modal })
    }
}
export class Collection<T> extends Range<T> {
    private _LatentSelectionItem: T | null = null;
    private _LatentSelectionPredicate: (value: T, index: number | null, obj: T[] | null) => unknown = null;

    private itemSelectedDispatcher = new EventDispatcher<ItemSelectedEvent<T>>();

    public onItemSelected(handler: Handler<ItemSelectedEvent<T>>) {
        this.itemSelectedDispatcher.register(handler);
    }

    constructor() {
        super();
        this._setSelection = this._setSelection.bind(this);
        this.OnAdd = this._setSelection;
    }
    private _setSelection(item: T): void {
        if ((this.SelectedItem === null) && (this._LatentSelectionItem === item)) {
            this.SelectedItem = this._LatentSelectionItem;
            this._LatentSelectionItem = null;
            this._LatentSelectionPredicate = null;
        }
        else if ((this.SelectedItem === null) && (this._LatentSelectionPredicate) && (this._LatentSelectionPredicate(item, 0, []))) {
            this.SelectedItem = item;
            this._LatentSelectionPredicate = null;
            this._LatentSelectionItem = null;
        }

    }
    private _IsFilterSet: boolean = false;
    public get IsFilterSet(): boolean {
        return this._IsFilterSet;
    }


    private _SelectedItems: string[];
    public get SelectedItems(): string[] {
        if (!this._SelectedItems) {
            this._SelectedItems == null
        }
        return this._SelectedItems;
    }
    public set SelectedItems(v: string[]) {
        this._SelectedItems = v;
    }


    private _SelectedItem: T | null = null;
    public get SelectedItem(): T {
        return this._SelectedItem;
    }
    public set SelectedItem(v: T) {
        if (this._SelectedItem === v) return;

        if (Array.isArray(v)) {
            this._SelectedItems = [];
            if (v.length === 0) {
                // Clear the selected items if v is empty
                this._SelectedItems = [];
                this.itemSelectedDispatcher.fire({
                    selectedItem: null,
                    selectedItems: this._SelectedItems
                });
                return;
            }

            for (const item of v) {
                const index = this._SelectedItems.indexOf(item);
                if (index === -1) {
                    // Item not in the array, add it
                    this._SelectedItems.push(item);
                } else {
                    // Item already exists, remove it
                    this._SelectedItems.splice(index, 1);
                }

                // Fire the event with the updated selection
                this.itemSelectedDispatcher.fire({
                    selectedItem: this._SelectedItem,
                    selectedItems: this._SelectedItems
                });
            }

        }
        if (v === null) {
            this._LatentSelectionItem = null;
            this._SelectedIndex = -1;
            this._SelectedItem = null;
        }
        else {
            const idx = this.indexOf(v);
            if (idx >= 0) {
                this._SelectedItem = v;
                this._SelectedIndex = idx;
                this.itemSelectedDispatcher.fire({
                    selectedItem: this._SelectedItem,
                    selectedItems: []
                });
            }
            else {
                this._LatentSelectionItem = v;
            }
        }
    }

    private _SelectedIndex: number = -1;
    public get SelectedIndex(): number {
        return this._SelectedIndex;
    }
    public set SelectedIndex(v: number) {
        if (this._SelectedIndex === v) return;
        if (v >= 0 && v < this.length) {
            this._SelectedIndex = v;
            this.SelectedItem = this[this._SelectedIndex];
        }
    }



    private _Filtered: Collection<T>;
    public get Filtered(): Collection<T> {
        if (!this._Filtered) {
            this._Filtered = new Collection<T>();
        }
        return this._Filtered;
    }


    SetFilter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): void {
        let arr: T[] = this.filter(predicate, thisArg);
        const oldSelectedItem: T = this.SelectedItem;

        this.SelectedItem = null;
        this.Filtered.Clear();
        arr.forEach((elem: T) => this.Filtered.Add(elem));
        this._IsFilterSet = true;
        if (this.Filtered.includes(oldSelectedItem)) {
            this.SelectedItem = oldSelectedItem;
        }
    }
    Select(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): boolean {
        const elem: T | null = this.find(predicate, thisArg);
        if (elem) {
            this.SelectedItem = elem;
            return true;
        }
        else {
            this._LatentSelectionPredicate = predicate;
            return false;
        }
    }
}
export class Notifiable {
    private subscribers: ((self: Notifiable, property: string, value: any) => void)[] = [];
    Subscribe(fn: (self: Notifiable, property: string, value: any) => void) {
        this.subscribers.push(fn);
    }
    Unsubscribe(fn: (self: Notifiable, property: string, value: any) => void) {
        const idx = this.subscribers.indexOf(fn);
        if (idx >= 0) {
            this.subscribers.splice(idx, 1);
        }
    }
    protected Notify<T>(property: string, value: T) {
        this.subscribers.forEach(element => {
            element(this, property, value);
        });
    }
}
export class Selectable extends Notifiable {

    private _IsSelected!: boolean;
    public get IsSelected(): boolean {
        return this._IsSelected;
    }

    Select(): void {
        if (!this._IsSelected) {
            this._IsSelected = true;
            this.Notify("IsSelected", true);
        }
    }
}
export class SelectableCollection<T extends Selectable> extends Collection<T> {
    OnPropertyChanged(item: Notifiable, property: string, value: any) {
        if (property === "IsSelected") {
            this.SelectedItem = item as T
        }
    }
    public override Add(item: T): number {
        item.Subscribe(this.OnPropertyChanged);
        return super.Add(item);
    }
    public override Remove(item: T): number {
        item.Unsubscribe(this.OnPropertyChanged);
        return super.Remove(item);
    }
}

interface IDictionary<T> {
    [Key: string]: T;
}
export class Dictionary<T> {
    private _dict: IDictionary<T> = {};
    constructor(dict: IDictionary<T> = {}) {
        this._dict = dict;
    }
    public get Keys(): string[] {
        return Object.keys(this._dict);
    }
    public get Values(): IDictionary<T> {
        return this._dict;
    }
}
