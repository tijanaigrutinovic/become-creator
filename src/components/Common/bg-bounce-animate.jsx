const BgBounceAnimate = () => {
  return (
    <div className="w-full h-full absolute">
      {/* Plava slika */}
      <img
        src="/images/common/light-blue.png"
        className="absolute z-10 animate-bounce-blue"
        width={781}
        height={869}
        alt="bounce-light-blue"
      />
      {/* Crvena slika */}
      <img
        src="/images/common/light-red.png"
        className="absolute z-10 animate-bounce-red"
        width={582}
        height={759}
        alt="bounce-light-red"
      />
    </div>
  );
};

export default BgBounceAnimate;
