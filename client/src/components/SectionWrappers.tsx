export default function SectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-full h-full max-sm:mt-4 relative ">
      {children}
    </section>
  );
}
