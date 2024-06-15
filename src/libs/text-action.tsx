interface MyTextActionProps {
  label: string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const MyTextAction: React.FC<MyTextActionProps> = ({
  label,
  color = "text-primary-c900",
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={`text-[14px] font-semibold ${color} underline hover:cursor-pointer ${className}`}
    >
      {label}
    </div>
  );
};

export default MyTextAction;
