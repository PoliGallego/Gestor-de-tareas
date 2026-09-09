import type { TeamMember } from "../types";
import Avatar from "./Avatar";

interface TeamFilterProps {
  members: TeamMember[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function TeamFilter({ members, selectedId, onSelect }: TeamFilterProps) {
  return (
    <div className="team-filter">
      <button
        className={`team-filter__chip ${selectedId === null ? "team-filter__chip--active" : ""}`}
        onClick={() => onSelect(null)}
      >
        Todo el equipo
      </button>
      {members.map((member) => (
        <button
          key={member.id}
          className={`team-filter__chip ${selectedId === member.id ? "team-filter__chip--active" : ""}`}
          onClick={() => onSelect(member.id)}
        >
          <Avatar member={member} size={22} />
          {member.name}
        </button>
      ))}
    </div>
  );
}
