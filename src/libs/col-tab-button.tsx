import { ColTabItem } from "@/enum/defined-type";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ColumnTabButtonProps {
  items: Array<ColTabItem>;
}

const ColumnTabButton: React.FC<ColumnTabButtonProps> = ({ items }) => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => {
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`group relative flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold duration-300 ease-in-out  ${
                pathname.includes(item.href)
                  ? "bg-primary-c200 text-primary-c900 hover:bg-primary-c300"
                  : "bg-grey-c10 text-grey-c900 hover:bg-grey-c100"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ColumnTabButton;
