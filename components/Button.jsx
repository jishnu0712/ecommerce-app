export default function Button({children, clickHandler, className }) {
  return (
    <button
      onClick={clickHandler}
      className={className}
    >
        {children}
    </button>
  );
}
