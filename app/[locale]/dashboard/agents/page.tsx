import SearchAgentForm from "@/components/forms/SearchAgentForm";

export default function ListAgentsPage() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">All Agents</h2>

        {/* CreateAgent Form */}
        <SearchAgentForm />
      </section>
    </>
  );
}
