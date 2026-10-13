import { useNavigate } from "react-router-dom";
import request from "../api/request.js";
import toCategoryBody from "../utils/toCategoryBody.js";
import useAction from "./useAction.js";

const useCategorySave = (token, categoryId) => {
  const navigate = useNavigate();

  const save = (values) =>
    request(categoryId ? `/categories/${categoryId}` : "/categories", {
      method: categoryId ? "PUT" : "POST",
      body: toCategoryBody(values),
      token,
    });

  return useAction(save, () => navigate("/admin/categories"));
};

export default useCategorySave;
