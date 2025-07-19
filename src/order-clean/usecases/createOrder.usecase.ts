import ItemGatewayInterface from 'src/arch_item/interfaces/itemGatewayInterface';
import OrderGatewayInterface from '../interfaces/gateways';
import { OrderDto } from '../infraestructure/api/dto/order.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import GetCustomerByCpf from 'src/customer/usecases/getCustomerByCpf.usecase';
import CustomerGatewayInterface from 'src/customer/interfaces/gateways';
import ProccessOrderItemUseCase from './processOrderItem.usecase';
import Order from '../entities/order.entity';
import { OrderMapper } from 'src/order/domain/mappings/mapEntityToResponseDto';
import HasRepeatedOrderItemIdsUseCase from './item/existingItem.usecase copy';
import { BaseException } from 'src/shared/exceptions/exceptions.base';

export default class ProcessOrderUseCase {
    constructor() { }
    static async processOrder(
        orderData: OrderDto,
        orderGateway: OrderGatewayInterface,
        itemGateway: ItemGatewayInterface,
        customerGateway: CustomerGatewayInterface,
        // paymentGateway: PaymentGatewayInterface
    ) {
        let customer: Customer | undefined;

        if (HasRepeatedOrderItemIdsUseCase.hasRepeatedOrderItemIds(orderData.orderItems)) {
            throw new BaseException(
                'Failed to create order: Order items must be unique. Found duplicate item IDs in order Items.',
                400,
                'HAD_ITEM_REPEATED'
            );
        }

        if (orderData.customerCpf) {
            customer = await GetCustomerByCpf.getCustomerByCpf(
                orderData.customerCpf,
                customerGateway,
            );
        }

        const processedOrderItems = await ProccessOrderItemUseCase.proccessOrderItem(orderData, itemGateway);

        const current_order = new Order({
            customerId: customer?.id,
            orderItems: processedOrderItems,
        });

        const createdOrder = await orderGateway.create(current_order);
        
        // TODO : QUANDO PASSAR O PAYMENT PARA O CLEAN ARCH - ATUALIZAR AQUI :)
        // const payment = await this.paymentService.createPayment(
        //     createdOrder.id,
        //     createdOrder.price,
        // );

        // TODO: APLICAR PRESENTER DEPOIS
        return {
            order: OrderMapper.mapOrderEntityToOrderProcessResponse(createdOrder),
            payment: null,
        };
    }
}
