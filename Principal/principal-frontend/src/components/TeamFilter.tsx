import type { TeamMember } from "../types";
import Avatar from "./Avatar";

interface TeamFilterProps {
  members: TeamMember[];
  selectedEmail: string | null;
  onSelect: (email: string | null) => void;
}

export default function TeamFilter({ members, selectedEmail, onSelect }: TeamFilterProps) {
  return (
    <div className="team-filter">
      <button
        className={`team-filter__chip ${selectedEmail === null ? "team-filter__chip--active" : ""}`}
        onClick={() => onSelect(null)}
      >
        Todo el equipo
      </button>
      {members.map((member) => (
        <button
          key={member.email}
          className={`team-filter__chip ${selectedEmail === member.email ? "team-filter__chip--active" : ""}`}
          onClick={() => onSelect(member.email)}
        >
          <Avatar member={member} size={22} />
          {member.name}
        </button>
      ))}
    </div>
  );
}
