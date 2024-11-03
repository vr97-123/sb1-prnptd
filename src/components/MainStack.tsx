import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { DashboardScreen } from "./screens/DashboardScreen";
import { AddItemScreen } from "./screens/AddItemScreen";
import { ItemDetailsScreen } from "./screens/ItemDetailsScreen";
import { MealSuggestionsScreen } from "./screens/MealSuggestionsScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#4CAF50",
                },
                headerTintColor: "#fff",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ title: "Smart Fridge" }}
            />
            <StackNavigator.Screen
                name="AddItem"
                component={AddItemScreen}
                options={{ title: "Add Item" }}
            />
            <StackNavigator.Screen
                name="ItemDetails"
                component={ItemDetailsScreen}
                options={{ title: "Item Details" }}
            />
            <StackNavigator.Screen
                name="MealSuggestions"
                component={MealSuggestionsScreen}
                options={{ title: "Meal Suggestions" }}
            />
            <StackNavigator.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: "Settings" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);