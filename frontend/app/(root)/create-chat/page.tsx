import { currentUser } from "@clerk/nextjs";;

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user


  return (
    <>
      <h1 className='head-text'>Create chat</h1>

      {/* <Postsynapse userId={userInfo._id} /> */}
    </>
  );
}

export default Page;
