import React from "react";

function Field({ label, error, children, htmlFor }) {
  const id = htmlFor || getChildId(children);
  return (
    <div className="flex mb-4 flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      {children}
      {!!error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}

export default Field;

const getChildId = (children) => {
  const child = React.Children.only(children);

  if ("id" in child.props) {
    return child.props.id;
  }
};
