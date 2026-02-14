import React, { useEffect, useState } from "react";
import { allCountries } from "country-telephone-data";
import "./myphone.css"

type Country = {
  name: string;
  dialCode: string;
  iso2: string;
};

function isoToFlagEmoji(iso2: string) {
  return iso2
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

type MyPhoneProps = {
  value?: string;
  onChange?: (value: string) => void;
  selectedCountry?: string;
  onCountryChange?: (iso2: string) => void;
  placeholder?: string;
  disabled?: boolean;

  className?: string; // clase del contenedor principal
  inputClassName?: string; // clase del input
  countryClassName?: string; // clase del país
};

export default function MyPhone({
  value: controlledValue,
  onChange,
  selectedCountry,
  onCountryChange,
  placeholder = "Número de teléfono",
  disabled = false,
  className,
  inputClassName,
  countryClassName,
}: MyPhoneProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [internalSelected, setInternalSelected] = useState<Country | null>(null);
  const [internalValue, setInternalValue] = useState("");

  useEffect(() => {
    const parsed: Country[] = allCountries.map((c: any) => ({
      name: c.name,
      iso2: c.iso2,
      dialCode: c.dialCode,
    }));

    setCountries(parsed);
    setInternalSelected(parsed[0]);
  }, []);

  const selected = countries.find((c) => c.iso2 === selectedCountry) || internalSelected || countries[0] || null;
  const phoneValue = controlledValue !== undefined ? controlledValue : internalValue;

  const handleCountryChange = (iso2: string) => {
    if (onCountryChange) onCountryChange(iso2);
    else setInternalSelected(countries.find((c) => c.iso2 === iso2) || null);
  };

  const handlePhoneChange = (val: string) => {
    const cleanVal = val.replace(/\D/g, "");
    if (onChange) onChange(cleanVal);
    else setInternalValue(cleanVal);
  };

  return (
    <div className={`my-phone ${className ?? ""}`}>
      <div className={`my-phone__country ${countryClassName ?? ""}`}>
        {selected && (
          <div className="my-phone__selected">
            <span className="flag">{isoToFlagEmoji(selected.iso2)}</span>
            <span className="code">+{selected.dialCode}</span>
            <span className="arrow">▾</span>
          </div>
        )}

        {/* Select invisible */}
        <select
          className="my-phone__select"
          value={selected?.iso2}
          onChange={(e) => handleCountryChange(e.target.value)}
          disabled={disabled}
        >
          {countries.map((c) => (
            <option key={c.iso2} value={c.iso2}>
              {isoToFlagEmoji(c.iso2)} {c.name} +{c.dialCode}
            </option>
          ))}
        </select>
      </div>

      <input
        type="tel"
        className={inputClassName ?? "input"} // misma clase que los demás inputs
        value={phoneValue}
        onChange={(e) => handlePhoneChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
