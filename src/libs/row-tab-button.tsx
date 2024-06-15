import { RowTabItem } from "@/enum/defined-type";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface RowTabButtonProps {
  items: Array<RowTabItem>;
  className?: string;
}

const RowTabButton: React.FC<RowTabButtonProps> = ({ items, className }) => {
  const pathname = usePathname();
  return (
    <ul className="flex w-fit flex-row gap-0 rounded-2xl bg-grey-c10">
      {items.map((item) => {
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`group relative flex h-[48px] w-[175px] ${className} items-center justify-center gap-2 rounded-2xl px-4 py-2 font-medium duration-300 ease-in-out  ${
                pathname.includes(item.href)
                  ? "bg-primary-c200 text-primary-c900 hover:bg-primary-c300"
                  : "bg-grey-c10 text-grey-c900 hover:bg-grey-c100"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default RowTabButton;
