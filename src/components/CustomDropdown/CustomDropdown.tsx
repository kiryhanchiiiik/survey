import { useState, useEffect, useRef } from "react";
import css from "./CustomDropdown.module.scss";

export interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function CustomDropdown({
  options,
  selected,
  onSelect,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.customSelectWrapper} ref={dropdownRef}>
      <button
        type="button"
        className={css.selectButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {options.find((o) => o.value === selected)?.label || "Select..."}
        <span className={`${css.arrow} ${isOpen ? css.arrowUp : ""}`}>
          <img width={20} height={20} src="/img/arrow-down.svg" alt="arrow" />
        </span>
      </button>
      {isOpen && (
        <ul className={css.dropdownList}>
          {options.map((option) => (
            <li
              key={option.value}
              className={css.dropdownItem}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
