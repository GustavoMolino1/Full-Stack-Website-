'use client';

import { useCallback } from "react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value);
    if (!isNaN(parsedValue)) {
      onChange(parsedValue);
    }
  }, [onChange]);

  return ( 
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">
          {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <input
          type="number"
          className="
            w-16
            h-10
            rounded-md
            border-[1px]
            border-neutral-400
            text-center
            text-neutral-600
            outline-none
            focus:border-neutral-600
            transition
          "
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
   );
}
 
export default Counter;
