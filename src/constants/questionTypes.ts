import {
    AlignLeft,
    Check,
    CheckSquare,
    ChevronDown,
    SlidersHorizontal,
    Type,
} from "lucide-react";

export const questionTypes = [
    { id: "short-answer", label: "Short answer", icon: Type },
    { id: "paragraph", label: "Paragraph", icon: AlignLeft },
    { id: "multiple-choice", label: "Multiple choice", icon: Check },
    { id: "checkboxes", label: "Checkboxes", icon: CheckSquare },
    { id: "dropdown", label: "Dropdown", icon: ChevronDown },
    { id: "linear-scale", label: "Linear scale", icon: SlidersHorizontal },
] as const;
