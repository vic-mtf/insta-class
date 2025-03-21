const getFile =
  (func, typeMIME = "image/*") =>
  () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = typeMIME;
    input.value = "";
    input.onchange = async (e) => {
      const files = e.target.files;
      if (typeof func === "function") func(files);
    };
    input.click();
  };

export default getFile;
