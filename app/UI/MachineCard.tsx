type MachineCardProps = {
  title: string;
  status: string;
};

function MachineCard({ title, status }: MachineCardProps) {
  return (
    <div>
      {title}
      {status}
    </div>
  );
}

export default MachineCard;
