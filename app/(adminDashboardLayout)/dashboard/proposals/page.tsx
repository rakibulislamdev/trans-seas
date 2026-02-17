import ProposalCard from "./_components/ProposalCard";
import ProposalsStats from "./_components/ProposalsStats";

const ProposalPage = () => {
  return (
    <div className="">
    <ProposalsStats/>
    <ProposalCard
      id="PRO-001"
      status="Approved"
      title="Website Redesign"
      company="Tech Solutions Inc."
      location="New York, USA"
      created="2023-10-20"
      updated="2023-10-25"
      currency="USD"
      amount="5000"
    />
    </div>
  )
}

export default ProposalPage;