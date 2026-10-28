function Fieldset({ title, children }) {
  return (
    <fieldset className="flex flex-col">
      <legend className="text-center uppercase ">{title}</legend>

      {children}
    </fieldset>
  );
}

export default Fieldset;
