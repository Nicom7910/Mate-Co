import { useNavigate } from "react-router-dom";
import request from "../api/request.js";
import toProductBody from "../utils/toProductBody.js";
import useAction from "./useAction.js";

const useProductSave = (token, productId) => {
  const navigate = useNavigate();

  const save = (values) =>
    request(productId ? `/products/${productId}` : "/products", {
      method: productId ? "PUT" : "POST",
      body: toProductBody(values),
      token,
    });

  return useAction(save, () => navigate("/admin/products"));
};

export default useProductSave;
