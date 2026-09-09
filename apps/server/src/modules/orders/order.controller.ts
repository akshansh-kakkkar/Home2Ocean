import { purchaseTransaction } from "./order.service";

export async function purchaseTransactionController( userId : string, orderId : string){
    return purchaseTransaction(userId, orderId)
}