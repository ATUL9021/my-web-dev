import { Link } from "react-router-dom";

function Button({ children, disabled = false, to, type = "primary", onClick }) {
  const base =
    "text-sm focus:ring-offset-2 inline-block rounded-full bg-yellow-400  font-semibold uppercase text-stone-900 transition-colors duration-500 hover:bg-yellow-100 focus:outline-none focus:ring focus:ring-yellow-400 disabled:cursor-not-allowed";
  const styles = {
    primary: base + " p-3",
    small: base + " py-1 px-4 text-xs",
    secondary:
      "text-sm focus:ring-offset-2 inline-block rounded-full border-2 border-stone-300 px-3  font-semibold uppercase text-stone-900 transition-colors duration-500 hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:ring-stone-400 disabled:cursor-not-allowed",
  };
  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  if (!onClick) {
    return (
      <button
        disabled={disabled}
        className={styles[type]}

        //   className="w-full rounded-full border-2 border-stone-500 px-2 py-2 text-sm transition-all focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-1"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles[type]}

      //   className="w-full rounded-full border-2 border-stone-500 px-2 py-2 text-sm transition-all focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-1"
    >
      {children}
    </button>
  );
}

export default Button;
