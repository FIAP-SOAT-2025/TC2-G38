import ItemCategoryEnum from "../entities/itemCategory.enum";
import { BadRequestException, NotFoundException} from '@nestjs/common';
import Item from "../entities/item.entity";
import ItemGatewayInterface from "../interfaces/itemGatewayInterface";
import { BaseException } from "src/shared/exceptions/exceptions.base";

export default class FindItemUseCase {
 static async findById(id: string,  itemGateway: ItemGatewayInterface): Promise<Item | null> {
        const notDeleteItem = await itemGateway.findByIdIfNotDeleted(id, false);
        return new Item(notDeleteItem); 
     
    }

} 
