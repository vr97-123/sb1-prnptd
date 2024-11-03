import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type ItemDetailsProps = {
    route: RouteProp<MainStackParamList, "ItemDetails">,
    navigation: FrameNavigationProp<MainStackParamList, "ItemDetails">,
};

export function ItemDetailsScreen({ navigation, route }: ItemDetailsProps) {
    // Mock item data - replace with actual data fetching
    const item = {
        id: "1",
        name: "Milk",
        expiryDate: "2024-03-20",
        category: "Dairy",
        quantity: 1,
        nutritionInfo: {
            calories: 103,
            protein: "8g",
            fat: "2.4g",
            carbs: "12g"
        }
    };

    return (
        <scrollView className="p-4">
            <Card className="mb-4">
                <label className="text-2xl font-bold mb-2">{item.name}</label>
                <gridLayout columns="auto, *" rows="auto, auto, auto" className="gap-2">
                    <label col="0" row="0" className="font-bold">Category:</label>
                    <label col="1" row="0">{item.category}</label>
                    
                    <label col="0" row="1" className="font-bold">Expiry Date:</label>
                    <label col="1" row="1">{item.expiryDate}</label>
                    
                    <label col="0" row="2" className="font-bold">Quantity:</label>
                    <label col="1" row="2">{item.quantity}</label>
                </gridLayout>
            </Card>

            <Card className="mb-4">
                <label className="text-xl font-bold mb-2">Nutrition Information</label>
                <gridLayout columns="auto, *" rows="auto, auto, auto, auto" className="gap-2">
                    <label col="0" row="0">Calories:</label>
                    <label col="1" row="0">{item.nutritionInfo.calories}</label>
                    
                    <label col="0" row="1">Protein:</label>
                    <label col="1" row="1">{item.nutritionInfo.protein}</label>
                    
                    <label col="0" row="2">Fat:</label>
                    <label col="1" row="2">{item.nutritionInfo.fat}</label>
                    
                    <label col="0" row="3">Carbs:</label>
                    <label col="1" row="3">{item.nutritionInfo.carbs}</label>
                </gridLayout>
            </Card>

            <gridLayout columns="*, *" className="gap-2">
                <Button 
                    col="0"
                    text="Edit Item"
                    variant="secondary"
                    onTap={() => {/* TODO: Implement edit */}}
                />
                <Button 
                    col="1"
                    text="Remove Item"
                    variant="danger"
                    onTap={() => {
                        // TODO: Implement remove
                        navigation.goBack();
                    }}
                />
            </gridLayout>
        </scrollView>
    );
}