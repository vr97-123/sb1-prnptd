import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { inventoryStore, InventoryItem } from "../../store/inventory";

type DashboardProps = {
    route: RouteProp<MainStackParamList, "Dashboard">,
    navigation: FrameNavigationProp<MainStackParamList, "Dashboard">,
};

export function DashboardScreen({ navigation }: DashboardProps) {
    const [items, setItems] = React.useState<InventoryItem[]>([]);

    React.useEffect(() => {
        const updateItems = () => {
            setItems(inventoryStore.getItems());
        };

        inventoryStore.on('propertyChange', updateItems);
        updateItems(); // Initial load

        return () => {
            inventoryStore.off('propertyChange', updateItems);
        };
    }, []);

    const getDaysUntilExpiry = (expiryDate: string) => {
        const days = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return days;
    };

    const getExpiryText = (days: number) => {
        if (days < 0) return "Expired";
        if (days === 0) return "Expires today";
        if (days === 1) return "Expires tomorrow";
        return `Expires in ${days} days`;
    };

    const getExpiryClass = (days: number) => {
        if (days < 0) return "text-red-500";
        if (days <= 3) return "text-yellow-500";
        return "text-green-500";
    };

    return (
        <gridLayout rows="auto, *, auto" className="p-4">
            {/* Stats Overview */}
            <stackLayout row="0" className="mb-4">
                <label className="text-2xl font-bold">Dashboard</label>
                <gridLayout columns="*, *, *" className="text-center mt-2">
                    <stackLayout col="0" className="bg-green-100 p-2 rounded-lg m-1">
                        <label className="font-bold">{items.length}</label>
                        <label>Items</label>
                    </stackLayout>
                    <stackLayout col="1" className="bg-yellow-100 p-2 rounded-lg m-1">
                        <label className="font-bold">
                            {items.filter(item => getDaysUntilExpiry(item.expiryDate) <= 3).length}
                        </label>
                        <label>Expiring</label>
                    </stackLayout>
                    <stackLayout col="2" className="bg-blue-100 p-2 rounded-lg m-1">
                        <label className="font-bold">{Math.min(5, Math.ceil(items.length / 2))}</label>
                        <label>Recipes</label>
                    </stackLayout>
                </gridLayout>
            </stackLayout>

            {/* Main Content */}
            <scrollView row="1" className="mb-4">
                <stackLayout>
                    <label className="text-xl font-bold mb-2">Recent Items</label>
                    {items.length === 0 ? (
                        <label className="text-gray-500 text-center p-4">
                            No items added yet. Tap 'Add Item' to get started!
                        </label>
                    ) : (
                        items.map(item => {
                            const days = getDaysUntilExpiry(item.expiryDate);
                            return (
                                <gridLayout 
                                    key={item.id}
                                    className="bg-white p-3 rounded-lg mb-2" 
                                    columns="*, auto"
                                    onTap={() => navigation.navigate("ItemDetails", { itemId: item.id })}
                                >
                                    <stackLayout col="0">
                                        <label className="font-bold">{item.name}</label>
                                        <label className="text-gray-500">{item.category}</label>
                                    </stackLayout>
                                    <label col="1" className={getExpiryClass(days)}>
                                        {getExpiryText(days)}
                                    </label>
                                </gridLayout>
                            );
                        })
                    )}
                </stackLayout>
            </scrollView>

            {/* Bottom Actions */}
            <gridLayout row="2" columns="*, *" className="gap-2">
                <button 
                    col="0"
                    className="bg-green-500 text-white p-4 rounded-lg"
                    onTap={() => navigation.navigate("AddItem")}
                >
                    Add Item
                </button>
                <button 
                    col="1"
                    className="bg-blue-500 text-white p-4 rounded-lg"
                    onTap={() => navigation.navigate("MealSuggestions")}
                >
                    Meal Ideas
                </button>
            </gridLayout>
        </gridLayout>
    );
}