import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

type MealSuggestionsProps = {
    route: RouteProp<MainStackParamList, "MealSuggestions">,
    navigation: FrameNavigationProp<MainStackParamList, "MealSuggestions">,
};

export function MealSuggestionsScreen({ navigation }: MealSuggestionsProps) {
    // Mock meal suggestions - replace with AI-generated suggestions
    const suggestions = [
        {
            id: "1",
            name: "Creamy Pasta",
            ingredients: ["Pasta", "Milk", "Cheese", "Butter"],
            difficulty: "Easy",
            time: "30 mins"
        },
        {
            id: "2",
            name: "Vegetable Stir Fry",
            ingredients: ["Carrots", "Broccoli", "Soy Sauce"],
            difficulty: "Medium",
            time: "25 mins"
        }
    ];

    return (
        <scrollView className="p-4">
            <label className="text-2xl font-bold mb-4">Suggested Meals</label>
            <label className="text-gray-500 mb-4">Based on your current inventory</label>

            {suggestions.map(meal => (
                <Card key={meal.id} className="mb-4">
                    <gridLayout rows="auto, auto" columns="*, auto">
                        <label row="0" col="0" className="text-xl font-bold">{meal.name}</label>
                        <stackLayout row="0" col="1">
                            <label className="text-sm text-gray-500">{meal.time}</label>
                            <label className="text-sm text-gray-500">{meal.difficulty}</label>
                        </stackLayout>
                        
                        <stackLayout row="1" col="0" colSpan="2" className="mt-2">
                            <label className="font-bold mb-1">Ingredients:</label>
                            <label>{meal.ingredients.join(", ")}</label>
                            
                            <Button 
                                text="View Recipe"
                                variant="secondary"
                                className="mt-2"
                                onTap={() => {/* TODO: Show recipe details */}}
                            />
                        </stackLayout>
                    </gridLayout>
                </Card>
            ))}

            <Button 
                text="Refresh Suggestions"
                variant="primary"
                className="mt-4"
                onTap={() => {/* TODO: Refresh suggestions */}}
            />
        </scrollView>
    );
}