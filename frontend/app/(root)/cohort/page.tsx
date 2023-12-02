import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

import Searchbar from "@/components/shared/Searchbar";
// import Pagination from "@/components/shared/Pagination";
// import CommunityCard from "@/components/cards/CommunityCard";

// import { fetchUser } from "@/lib/actions/user.actions";
// import { fetchcohort } from "@/lib/actions/community.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  // const result = await fetchcohort({
  //   searchString: searchParams.q,
  //   pageNumber: searchParams?.page ? +searchParams.page : 1,
  //   pageSize: 25,
  // });

  return (
    <>
      <h1 className='head-text'>cohort</h1>

      <div className='mt-5'>
        <Searchbar routeType='cohort' />
      </div>

      <section className='mt-9 flex flex-wrap gap-4'>
        <p className='no-result'>No Cohort</p>
      </section>

      {/* <Pagination
        path='cohort'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      /> */}
    </>
  );
}

export default Page;
