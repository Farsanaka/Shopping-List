const BackgroundLayout = ({ bgImage, children }) => {
  return (
    <div
      className={`relative min-h-screen bg-cover bg-center bg-fixed`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-75 z-0 min-h-screen w-full"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundLayout;
