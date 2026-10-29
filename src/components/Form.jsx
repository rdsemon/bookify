function Form({ onSubmit, children }) {
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="border border-r-amber-300 basis-1/2 rounded-md px-4 py-2 shadow-md "
      >
        {children}
      </form>
    </div>
  );
}

export default Form;
