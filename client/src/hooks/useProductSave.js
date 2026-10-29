import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveProduct } from "../redux/productsSlice.js";
import useAction from "./useAction.js";

const useProductSave = (productId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useAction(
    (values, images) =>
      dispatch(saveProduct({ id: productId, values, images })).unwrap(),
    () => navigate("/admin/products"),
  );
};

export default useProductSave;
