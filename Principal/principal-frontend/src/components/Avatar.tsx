import type { TeamMember } from "../types";

interface AvatarProps {
  member: TeamMember;
  size?: number;
}

export default function Avatar({ member, size = 28 }: AvatarProps) {
  return (
    <div
      className="avatar"
      title={member.name}
      style={{
        width: size,
        height: size,
        backgroundColor: member.color,
        fontSize: size * 0.4,
      }}
    >
      {member.initials}
    </div>
  );
}
