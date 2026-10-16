export const MAX_IMAGES = 6;
export const MAX_SIZE = 5 * 1024 * 1024;

let lastKey = 0;
const newKey = () => `image-${(lastKey += 1)}`;

export const fromUrl = (url) => ({
  key: newKey(),
  url,
  file: null,
  preview: url,
});

export const fromFile = (file) => ({
  key: newKey(),
  url: null,
  file,
  preview: URL.createObjectURL(file),
});

export const revokeItem = (item) => {
  if (item?.file) URL.revokeObjectURL(item.preview);
};

export const getAddError = (chosen, valid, accepted) => {
  if (valid.length < chosen.length)
    return "Alguna imagen pesa más de 5 MB y no se agregó";
  if (accepted.length < valid.length)
    return `Se pueden cargar hasta ${MAX_IMAGES} imágenes`;
  return null;
};
