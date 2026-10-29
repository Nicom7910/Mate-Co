import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCategory } from "../redux/categoriesSlice.js";
import useAction from "./useAction.js";

const useCategorySave = (categoryId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useAction(
    (values) => dispatch(saveCategory({ id: categoryId, values })).unwrap(),
    () => navigate("/admin/categories"),
  );
};

export default useCategorySave;
