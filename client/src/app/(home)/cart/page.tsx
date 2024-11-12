"use server";

import { handleGetAddressAction } from "@/action/addressAction";
import { handleGetCartAction } from "@/action/cartAction";
import { handleCreateOrderstAction } from "@/action/ordersActions";
import CartPage from "@/components/home/cart/cart";

export default async function page() {
  const tinhResponse = await handleGetAddressAction("tinh");
  const tinhs = tinhResponse.data;
  const cart = await handleGetCartAction();
  const handleThanhToan = async (shippingAddress: any) => {
    "use server";
    const oders = await handleCreateOrderstAction({
      cartId: cart?.data?._id,
      shippingAddress:{
        name: shippingAddress.name,
        phone: shippingAddress.phone,
        address: `${shippingAddress.address}, ${shippingAddress.xa}, ${shippingAddress.huyen}, ${shippingAddress.tinh}`,
      }
    });
    if(oders.data){
      return true;
    }else{
      return false;
    }
  };
  return (
    <CartPage tinhs={tinhs} cart={cart} handleThanhToan={handleThanhToan} />
  );
}
