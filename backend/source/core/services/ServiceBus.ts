export interface ServiceBus {
    Dispatch<T, S>(message: T): Promise<S>; 
}
