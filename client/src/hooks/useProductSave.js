import { useNavigate } from "react-router-dom";
import request from "../api/request.js";
import uploadImage from "../api/uploadImage.js";
import toProductBody from "../utils/toProductBody.js";
import useAction from "./useAction.js";

const useProductSave = (token, productId) => {
  const navigate = useNavigate();

  const save = (values, file) =>
    (file ? uploadImage(file, token) : Promise.resolve(values.imageUrl)).then(
      (imageUrl) =>
        request(productId ? `/products/${productId}` : "/products", {
          method: productId ? "PUT" : "POST",
          body: toProductBody({ ...values, imageUrl }),
          token,
        }),
    );

  return useAction(save, () => navigate("/admin/products"));
};

export default useProductSave;
