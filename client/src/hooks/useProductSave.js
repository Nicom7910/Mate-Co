import { useNavigate } from "react-router-dom";
import request from "../api/request.js";
import uploadImage from "../api/uploadImage.js";
import toProductBody from "../utils/toProductBody.js";
import useAction from "./useAction.js";

const useProductSave = (token, productId) => {
  const navigate = useNavigate();

  const uploadAll = (images) =>
    Promise.all(
      images.map(({ url, file }) =>
        file ? uploadImage(file, token) : Promise.resolve(url),
      ),
    );

  const save = (values, images) =>
    uploadAll(images).then((imageUrls) =>
      request(productId ? `/products/${productId}` : "/products", {
        method: productId ? "PUT" : "POST",
        body: toProductBody({ ...values, imageUrls }),
        token,
      }),
    );

  return useAction(save, () => navigate("/admin/products"));
};

export default useProductSave;
