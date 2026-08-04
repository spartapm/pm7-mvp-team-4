type CefrBadgeProps = {
  cefr: string;
  locked?: boolean;
};

export function CefrBadge({ cefr, locked }: CefrBadgeProps) {
  return (
    <span
      className={`inline-flex h-5 min-w-[28px] items-center justify-center rounded-md px-1.5 text-[11px] font-bold leading-none ${
        locked
          ? "bg-[#E5E7EB] text-[#9CA3AF]"
          : "bg-speak-blue text-white"
      }`}
    >
      {cefr}
    </span>
  );
}
