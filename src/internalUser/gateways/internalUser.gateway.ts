import { InternalUserGatewayInterface } from "./interfaces/internalUser.repository";

export class CustomerGateway implements InternalUserGatewayInterface {
    constructor(
      private readonly customerRepository: InternalUserGatewayInterface
    ) {

        //
        
    }
  
  