'use server';

import { handleGetAddressAction } from "@/action/addressAction";
import { handleGetCartAction } from "@/action/cartAction";
import CartPage from "@/components/home/cart/cart";

export default async function page() {
  const tinhResponse = await handleGetAddressAction('tinh');
  const tinhs = tinhResponse.data;
  const cart = await handleGetCartAction();
  return (
    <CartPage tinhs={tinhs} cart={cart}/>
  )
}
