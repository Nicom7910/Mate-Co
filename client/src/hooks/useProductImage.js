import { useEffect, useMemo, useState } from "react";

const MAX_SIZE = 5 * 1024 * 1024;

const useProductImage = (initialUrl) => {
  const [file, setFile] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(initialUrl ?? "");
  const [error, setError] = useState(null);
  const [inputKey, setInputKey] = useState(0);
  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : currentUrl),
    [file, currentUrl],
  );

  useEffect(
    () => () => {
      if (file) URL.revokeObjectURL(preview);
    },
    [file, preview],
  );

  const select = (chosen) => {
    setError(null);
    if (chosen && chosen.size > MAX_SIZE) {
      setFile(null);
      setError("La imagen pesa más de 5 MB");
      setInputKey((key) => key + 1);
      return;
    }
    setFile(chosen ?? null);
  };

  const remove = () => {
    setFile(null);
    setCurrentUrl("");
    setError(null);
    setInputKey((key) => key + 1);
  };

  return { file, currentUrl, preview, error, inputKey, select, remove };
};

export default useProductImage;
