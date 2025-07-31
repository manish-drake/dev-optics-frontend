export type Handler<E> = (event: E) => void;

export class EventDispatcher<E> { 
    private handlers: Handler<E>[] = [];
        register(handler: Handler<E>) { 
        this.handlers.push(handler);
    }
        fire(event: E) { 
        for (let h of this.handlers)
            h(event);
    }
}