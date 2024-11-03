import * as React from "react";

type ButtonProps = {
    text: string;
    onTap: () => void;
    variant?: "primary" | "secondary" | "danger";
    className?: string;
};

export function Button({ text, onTap, variant = "primary", className = "" }: ButtonProps) {
    const baseStyle = "p-4 rounded-lg text-white text-center";
    const variantStyles = {
        primary: "bg-green-500",
        secondary: "bg-blue-500",
        danger: "bg-red-500"
    };

    return (
        <button 
            className={`${baseStyle} ${variantStyles[variant]} ${className}`}
            onTap={onTap}
        >
            {text}
        </button>
    );
}