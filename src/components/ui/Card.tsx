import * as React from "react";

type CardProps = {
    children: React.ReactNode;
    className?: string;
};

export function Card({ children, className = "" }: CardProps) {
    return (
        <stackLayout className={`bg-white p-4 rounded-lg shadow-sm ${className}`}>
            {children}
        </stackLayout>
    );
}