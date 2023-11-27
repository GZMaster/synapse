// import { currentUser } from "@clerk/nextjs";

// import UserCard from "../cards/UserCard";

async function RightSidebar() {
  // const suggestedcohort = ["January", "February", "March", "April", "May"]

  // const user = await currentUser();
  // if (!user) return null;


  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>
          Suggested cohort
        </h3>

        {/* <div className='mt-7 flex w-[350px] flex-col gap-9'>
          {suggestedcohort.cohort.length > 0 ? (
            <>
              {suggestedcohort.cohort.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType='Community'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>
              No cohort yet
            </p>
          )}
        </div> */}
      </div>

      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>Similar Minds</h3>
        {/* <div className='mt-7 flex w-[350px] flex-col gap-10'>
          {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>No users yet</p>
          )}
        </div> */}
      </div>
    </section>
  );
}

export default RightSidebar;
