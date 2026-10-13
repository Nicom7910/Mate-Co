import request from "./request.js";

const uploadImage = (file, token) => {
  const form = new FormData();
  form.append("file", file);

  return request("/images", { method: "POST", body: form, token }).then(
    (data) => data.url,
  );
};

export default uploadImage;
