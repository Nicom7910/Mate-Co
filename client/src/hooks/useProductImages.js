import { useEffect, useRef, useState } from "react";
import {
  MAX_IMAGES,
  MAX_SIZE,
  fromFile,
  fromUrl,
  getAddError,
  revokeItem,
} from "../utils/imageItems.js";

const useProductImages = (initialUrls) => {
  const [items, setItems] = useState(() => initialUrls.map(fromUrl));
  const [error, setError] = useState(null);
  const [inputKey, setInputKey] = useState(0);
  const itemsRef = useRef(items);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => () => itemsRef.current.forEach(revokeItem), []);

  const add = (chosen) => {
    if (chosen.length === 0) return;
    const valid = chosen.filter((file) => file.size <= MAX_SIZE);
    const accepted = valid.slice(0, MAX_IMAGES - items.length);
    const added = accepted.map(fromFile);
    setError(getAddError(chosen, valid, accepted));
    setItems((current) => [...current, ...added]);
    setInputKey((key) => key + 1);
  };

  const remove = (key) => {
    revokeItem(items.find((item) => item.key === key));
    setItems((current) => current.filter((item) => item.key !== key));
    setError(null);
  };

  const makeMain = (key) =>
    setItems((current) => [
      current.find((item) => item.key === key),
      ...current.filter((item) => item.key !== key),
    ]);

  return {
    items,
    error,
    inputKey,
    canAddMore: items.length < MAX_IMAGES,
    add,
    remove,
    makeMain,
  };
};

export default useProductImages;
