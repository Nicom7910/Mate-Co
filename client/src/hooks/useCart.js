import { useEffect, useState } from "react";
import request from "../api/request.js";
import countUnits from "../utils/countUnits.js";

const useCart = (token, enabled = true) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!token || !enabled) return;
    const controller = new AbortController();

    request("/cart", { token, signal: controller.signal })
      .then((data) => setCart(data))
      .catch(() => {});

    return () => controller.abort();
  }, [token, enabled]);

  const update = (path, method, body) =>
    request(path, { method, body, token }).then((data) => setCart(data));

  const addItem = (productId, quantity) =>
    update("/cart/items", "POST", { productId, quantity });
  const changeQuantity = (productId, quantity) =>
    update(`/cart/items/${productId}`, "PUT", { quantity });
  const removeItem = (productId) =>
    update(`/cart/items/${productId}`, "DELETE");

  const clear = () =>
    request("/cart", { method: "DELETE", token }).then(() => setCart(null));

  const checkout = () =>
    request("/cart", { method: "PATCH", body: { status: "PAID" }, token }).then(
      (order) => {
        setCart(null);
        return order;
      },
    );

  const reset = () => setCart(null);

  return {
    cart,
    count: countUnits(cart),
    addItem,
    changeQuantity,
    removeItem,
    clear,
    checkout,
    reset,
  };
};

export default useCart;
