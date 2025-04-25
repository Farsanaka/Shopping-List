const BackgroundLayout = ({ bgImage, children }) => {
  return (
    <div
      className={`relative h-screen bg-cover bg-center`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-75 z-0 h-screen"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundLayout;
