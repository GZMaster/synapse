import { Button } from "../ui/button";

async function RightSidebar() {

  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-col justify-start shadow-[0px_1px_2px_0px_#475467,0px_1px_3px_0px_#475467] p-5 gap-8'>
        <h3 className='text-light-1 '>
          Based on your last assessment, you&apos;ve been paired with Lucian
        </h3>

       <Button className="flex justify-center items-center gap-2 border border-[color:var(--primary-600,#7F56D9)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] px-[18px] py-2.5 rounded-lg border-solid text text-[color:var(--base-white,#FFF)] text-base not-italic font-semibold leading-6">
          Give feedback
       </Button>
      </div>
      
      
      <div className='flex flex-col justify-start shadow-[0px_1px_2px_0px_#475467,0px_1px_3px_0px_#475467] p-5 gap-8'>
        <h3 className=' text-light-1 '>
          You scored 70% on your assessment
        </h3>

        {[
          [20, 'UI/UX Design'],
          [65, 'Data Science'],
          [78, 'Frontend Development'],
          [100, 'Backend Development',],
        ].map(([percent, name], index) => (
        <div key={index} className="flex justify-between items-start self-stretch rounded p-2 text-white">
            <span className="text-xs not-italic font-semibold leading-[18px]">{name}</span>
            <span className="text-xs not-italic font-semibold leading-[18px]">{percent}%</span>
        </div>
        ))}
      </div>

    </section>
  );
}

export default RightSidebar;
