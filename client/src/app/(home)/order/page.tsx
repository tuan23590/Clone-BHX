'use server';

import { handleGetOrderstAction } from "@/action/ordersActions";
import { auth } from "@/auth";
import OrderPage from "@/components/home/order/page";

export default async function page() {
  const session = await auth();
  const listOrders = await handleGetOrderstAction({ phone: session?.user.phone });
  return (
    <OrderPage listOrders={listOrders?.data}/>
  )
}
