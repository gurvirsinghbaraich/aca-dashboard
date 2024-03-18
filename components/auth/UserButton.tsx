import ClientSideUserButton from "@/components/auth/ClientSideUserButton";

export default function UserButton() {
  return (
    <div className="relative flex items-center justify-center gap-2 rounded-full">
      <ClientSideUserButton />
    </div>
  );
}
