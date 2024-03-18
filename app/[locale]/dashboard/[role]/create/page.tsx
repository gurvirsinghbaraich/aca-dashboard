import { createAgent } from "@/actions";
import CreateAgentForm from "@/components/forms/CreateAgentForm";

export default function CreateAgentPage() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Create New Agent</h2>

      {/* CreateAgent Form */}
      <CreateAgentForm createAgentAction={createAgent} />
    </section>
  );
}

export const metadata = {
  title: "Create Agent - Aca Dashboard",
};
