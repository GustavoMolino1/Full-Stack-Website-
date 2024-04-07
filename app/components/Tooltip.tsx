import { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode; 
  children: ReactNode;
}

const Tooltip = ({ content, children }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="tooltip-container" onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip}>
      {children}
      {showTooltip && <div className="tooltip">{content}</div>}
    </div>
  );
};

export default Tooltip;
