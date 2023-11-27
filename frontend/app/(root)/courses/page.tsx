import Image from "next/image"

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {

  return (
    <>
      <div className="flex flex-col gap-2 pb-7 border-b border-[#475467] mb-[3rem]">
        <h1 className='head-text text-left'>Courses</h1>
      </div>

      <section className='mt-9 flex flex-col gap-10'>
        <div className="grid grid-cols-2 gap-8 items-center justify-center mt-10">
        {[
          ['/book.svg', 'UI/UX Design', '/chevron-right.svg'],
          ['/book.svg', 'Data Science', '/chevron-right.svg'],
          ['/book.svg', 'Frontend Development', '/chevron-right.svg'],
          ['/book.svg', 'Backend Development', '/chevron-right.svg'],
        ].map(([image, name, icon], index) => (
          <div key={index} className="w-full">
            <span className="flex flex-col gap-16 border border-black shadow-[0px_1px_2px_0px_#475467,0px_1px_3px_0px_#475467] p-6 rounded-xl border-solid">
              <Image 
                src={image}
                alt={name}
                width={40}
                height={40}
                className=""
              />
              <span className="flex justify-between w-full">
                <h2 className="text-white">{name}</h2>
                <Image 
                  src={icon}
                  alt={name}
                  width={22}
                  height={22}
                  className="bg-[#475467] rounded-lg"
                />
              </span>
            </span>
          </div>
        ))}
        </div>
      </section>
    </>
  );
}

export default Home;
