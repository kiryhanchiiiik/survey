import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import css from "./SurveyPage.module.scss";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import toast from "react-hot-toast";

interface Option {
  label: string;
  value: string;
}

const incomeOptions: Option[] = [
  { label: "$0", value: "0" },
  { label: "<$20,000", value: "<20000" },
  { label: "$20,000-$40,000", value: "20000-40000" },
  { label: "$40,000-$80,000", value: "40000-80000" },
  { label: ">$80,000", value: ">80000" },
];

const employmentOptions: Option[] = [
  { label: "Full Time", value: "fulltime" },
  { label: "Part Time", value: "parttime" },
  { label: "Self-Employed", value: "self" },
  { label: "Retired", value: "retired" },
  { label: "Other", value: "other" },
];

const CustomDropdown = ({
  options,
  selected,
  onSelect,
}: {
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
}) => {
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
        {options.find((o) => o.value === selected)?.label}
        <span className={`${css.arrow} ${isOpen ? css.arrowUp : ""}`}>▼</span>
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
};

function SurveyPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [income, setIncome] = useState(localStorage.getItem("income") || "");
  const [employment, setEmployment] = useState(
    localStorage.getItem("employment") || ""
  );
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");

  useEffect(() => {
    localStorage.setItem("income", income);
    localStorage.setItem("employment", employment);
    localStorage.setItem("phone", phone);
  }, [income, employment, phone]);

  const handleNext = () => {
    if (step === 0 && !income) return;
    if (step === 1 && !employment) return;
    if (step === 2) {
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (!phoneRegex.test(phone)) {
        toast.error(
          "Please enter a valid US phone number (e.g., 123-456-7890)."
        );
        return;
      }
      navigate("/success");
      return;
    }
    setStep(step + 1);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);

    // Форматируем как XXX-XXX-XXXX
    if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}`;
    }

    setPhone(value);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Survey</h2>
      <ProgressBar completed={step} total={3} />

      <div className={css.formContainer}>
        <AnimatePresence>
          {step === 0 && (
            <motion.div
              key="income"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={css.question}
            >
              <label className={css.label}>Income range:</label>
              <CustomDropdown
                options={incomeOptions}
                selected={income}
                onSelect={setIncome}
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="employment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={css.question}
            >
              <label className={css.label}>Employment status:</label>
              <CustomDropdown
                options={employmentOptions}
                selected={employment}
                onSelect={setEmployment}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={css.question}
            >
              <div className={css.phoneInputWrapper}>
                <label className={css.phoneLabel}>US Phone Number:</label>
                <input
                  type="text"
                  placeholder="123-456-7890"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={css.phoneInput}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button className={css.btn} type="button" onClick={handleNext}>
          {step < 2 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default SurveyPage;
