// import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

// import { fetchPosts } from "@/lib/actions/synapse.actions";
// import { fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image"

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // const user = await currentUser();
  // if (!user) return null;

  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  // const result = await fetchPosts(
  //   searchParams.page ? +searchParams.page : 1,
  //   30
  // );

  return (
    <>
      <div className="flex flex-col gap-2 pb-7 border-b border-[#475467] mb-[3rem]">
        <h1 className='head-text text-left'>Overview</h1>
        <span className="text-[#475467] text-sm">Welcome back, Olivia</span>
      </div>

      <section className='mt-9 flex flex-col gap-10'>
        <div className="flex flex-col gap-2 pb-5 border-b border-[#475467]">
          <h1 className="text-white font-semibold leading-7">
            Courses
          </h1>
          <span className="text-[#475467] text-sm">
            Courses you&apos;re currently taking.
          </span>
        </div>

        <div className="flex flex-wrap gap-8 items-center justify-center mt-10">
        {[
          ['/book.svg', 'UI/UX Design', '/chevron-right.svg'],
          ['/book.svg', 'Data Science', '/chevron-right.svg'],
          ['/book.svg', 'Frontend Development', '/chevron-right.svg'],
          ['/book.svg', 'Backend Development', '/chevron-right.svg'],
        ].map(([image, name, icon], index) => (
          <div key={index}>
            <span className="flex w-[25rem] max-md:w flex-col gap-16 border border-black shadow shadow-[#475467] p-6 rounded-xl border-solid">
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
