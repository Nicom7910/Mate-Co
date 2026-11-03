import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "./cartSlice.js";
import { deleteCategory, saveCategory } from "./categoriesSlice.js";
import { cancelOrder, shipOrder } from "./ordersSlice.js";
import { saveProduct, setProductActive } from "./productsSlice.js";
import { createReview } from "./reviewsSlice.js";

const MAX_NOTICES = 3;

const push = (state, message, extra = {}) => {
  state.lastId += 1;
  state.items.push({ id: state.lastId, message, ...extra });
  if (state.items.length > MAX_NOTICES) state.items.shift();
};

const notifyWith = (build) => (state, action) => {
  const notice = build(action);
  push(state, notice.message, notice);
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { items: [], lastId: 0 },
  reducers: {
    dismissNotice: (state, action) => {
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        addToCart.fulfilled,
        notifyWith(({ payload, meta }) => {
          const item = payload.items?.find(
            ({ productId }) => productId === meta.arg.productId,
          );
          return {
            message: `${item?.productName ?? "El producto"} se agregó al carrito.`,
            to: "/cart",
            linkText: "Ver carrito",
          };
        }),
      )
      .addCase(
        saveProduct.fulfilled,
        notifyWith(({ meta }) => ({
          message: meta.arg.id ? "Producto actualizado." : "Producto creado.",
        })),
      )
      .addCase(
        setProductActive.fulfilled,
        notifyWith(({ meta }) => ({
          message: meta.arg.active
            ? "Producto restaurado."
            : "Producto eliminado.",
        })),
      )
      .addCase(
        saveCategory.fulfilled,
        notifyWith(({ meta }) => ({
          message: meta.arg.id ? "Categoría actualizada." : "Categoría creada.",
        })),
      )
      .addCase(
        deleteCategory.fulfilled,
        notifyWith(() => ({ message: "Categoría eliminada." })),
      )
      .addCase(
        cancelOrder.fulfilled,
        notifyWith(() => ({ message: "Compra cancelada." })),
      )
      .addCase(
        shipOrder.fulfilled,
        notifyWith(() => ({ message: "Pedido marcado como enviado." })),
      )
      .addCase(
        createReview.fulfilled,
        notifyWith(() => ({ message: "¡Gracias por tu reseña!" })),
      );
  },
});

export const { dismissNotice } = notificationsSlice.actions;

export const selectNotices = (state) => state.notifications.items;

export default notificationsSlice.reducer;
