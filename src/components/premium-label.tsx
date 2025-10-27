interface PremiumLabelProps {
  isPremium: boolean;
}

export default function PremiumLabel({
  isPremium
}: PremiumLabelProps) {
  return (
    isPremium &&
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );
}
