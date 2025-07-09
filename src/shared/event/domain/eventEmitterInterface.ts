export interface IEventEmitter {
  emit(name: string, obj: any): boolean;
}
