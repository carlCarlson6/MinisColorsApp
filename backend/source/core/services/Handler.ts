export interface Handler<T> {
    Handle<T, S>(message: T): Promise<S>
}