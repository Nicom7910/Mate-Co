import { useEffect, useRef, useState } from "react";
import {
  MAX_SIZE,
  fromFile,
  fromUrl,
  revokeItem,
} from "../utils/imageItems.js";

const useSingleImage = (initialUrl) => {
  const [item, setItem] = useState(() =>
    initialUrl ? fromUrl(initialUrl) : null,
  );
  const [error, setError] = useState(null);
  const [inputKey, setInputKey] = useState(0);
  const itemRef = useRef(item);

  useEffect(() => {
    itemRef.current = item;
  }, [item]);

  useEffect(() => () => revokeItem(itemRef.current), []);

  const select = (file) => {
    setInputKey((key) => key + 1);
    if (!file) return;
    if (file.size > MAX_SIZE) {
      setError("La imagen pesa más de 5 MB y no se agregó.");
      return;
    }
    revokeItem(item);
    setError(null);
    setItem(fromFile(file));
  };

  const remove = () => {
    revokeItem(item);
    setItem(null);
    setError(null);
  };

  return {
    item,
    preview: item?.preview ?? null,
    error,
    inputKey,
    select,
    remove,
  };
};

export default useSingleImage;
