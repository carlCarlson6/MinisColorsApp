export interface Handler<T, S> {
    Handle(message: T): Promise<S>
}
