const uploadImage = (file, send) => {
  const form = new FormData();
  form.append("file", file);

  return send("/images", { method: "POST", body: form }).then(
    (data) => data.url,
  );
};

export default uploadImage;
