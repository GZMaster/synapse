// import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserPosts } from "@/lib/actions/user.actions";

import SynapseCard from "../cards/SynapseCard";

interface Result {
  name: string;
  image: string;
  id: string;
  synapses: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function SynapsesTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) {
    // redirect("/");
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.synapses.map((synapse) => (
        <SynapseCard
          key={synapse._id}
          id={synapse._id}
          currentUserId={currentUserId}
          parentId={synapse.parentId}
          content={synapse.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: synapse.author.name,
                  image: synapse.author.image,
                  id: synapse.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : synapse.community
          }
          createdAt={synapse.createdAt}
          comments={synapse.children}
        />
      ))}
    </section>
  );
}

export default SynapsesTab;
