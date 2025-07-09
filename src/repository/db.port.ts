export default interface DataBaseConnectionPort {
  onModuleInit(): Promise<void>;
  onModuleDestroy(): Promise<void>;
}
