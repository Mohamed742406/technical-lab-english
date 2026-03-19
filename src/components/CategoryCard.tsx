import { VocabCategory } from "@/data/vocabulary";

interface CategoryCardProps {
  category: VocabCategory;
  isActive: boolean;
  onClick: () => void;
}

const CategoryCard = ({ category, isActive, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-300 font-display text-sm font-semibold whitespace-nowrap ${
        isActive
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
    >
      <span className="text-xl">{category.icon}</span>
      <span>{category.name}</span>
      <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
        {category.words.length}
      </span>
    </button>
  );
};

export default CategoryCard;
