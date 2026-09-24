function Card({ children, className = '', ...rest }) {
  return (
    <div
      className={`rounded-2xl border border-ink-100 bg-white p-5 shadow-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;