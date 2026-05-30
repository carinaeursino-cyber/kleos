export default function HeroCopy() {
  return (
    <div className="max-w-4xl xl:max-w-5xl flex flex-col items-center text-center px-6 select-text pb-4">
      {/* TITULAR: grande, dominante, con aire */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-neutral-100 font-light leading-[1.15] tracking-wide">
        "Tu trabajo no es el problema.{" "}
        <br className="hidden sm:inline" />
        <span className="text-gold italic font-normal block mt-2 sm:mt-3">
          La percepción de tu trabajo
          <br className="hidden md:inline" /> sí lo es."
        </span>
      </h2>

      {/* Separador */}
      <div className="w-24 md:w-32 h-[1px] bg-gold/20 my-6 md:my-8" />
    </div>
  );
}
