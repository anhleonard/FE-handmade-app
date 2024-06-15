import MyDefaultText from "@/libs/default-text";

type Props = {
  reason: string;
};

const ReasonCancelOrder = ({ reason }: Props) => {
  return (
    <div className="py-2">
      <MyDefaultText type="error">{reason}</MyDefaultText>
    </div>
  );
};

export default ReasonCancelOrder;
