import Link from "next/link";

type NavigateItemProps = {
  href: string;
  label: string;
  isSelected: boolean;
};

const NavigateItem = ({ href, label, isSelected }: NavigateItemProps) => {
  return (
    <li role="presentation">
      <Link
        href={href}
        className={`rounded-t-lg border-b-2 border-transparent px-3 py-2.5 text-sm text-grey-c900 transition duration-200 hover:border-grey-c200 ${isSelected ? "!border-primary-c900" : ""}`}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavigateItem;
