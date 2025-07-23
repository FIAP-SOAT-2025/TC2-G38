import Item from 'src/arch_item/entities/item.entity';
import ExistingItemUseCase from './item/existingItem.usecase';
import { OrderItemDto } from '../infraestructure/api/dto/order.dto';
import ItemGatewayInterface from 'src/arch_item/interfaces/itemGatewayInterface';
import { BaseException } from 'src/shared/exceptions/exceptions.base';
import ItemQuantityAvailableUseCase from './item/itemQuantityAvailable.usecase';

export default class ValidItemOrderUseCase {
    constructor() { }
    static async validItemOrderUseCase(
        itemGateway: ItemGatewayInterface,
        orderItemDto: OrderItemDto
    ): Promise<Item> {

        const item = await ExistingItemUseCase._getExistingItem(orderItemDto.itemId, itemGateway);

        if (!item) {
            throw new BaseException('Not Found Item', 404, 'NOT_FOUND_ITEM');
        }

        const isItemQuantityValid = ItemQuantityAvailableUseCase._isItemQuantityAvailable(
            item,
            orderItemDto.itemQuantity,
        );


        if (!isItemQuantityValid) {
            throw new BaseException(
                `Failed to create order: Item with ID ${orderItemDto.itemId} does not have enough quantity. Quantity: ${item.quantity}`,
                400,
                'ITEM_NOT_AVAILABLE'
            );
        }

        return item
    }
}
