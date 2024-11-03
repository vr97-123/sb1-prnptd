import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

type SettingsProps = {
    route: RouteProp<MainStackParamList, "Settings">,
    navigation: FrameNavigationProp<MainStackParamList, "Settings">,
};

export function SettingsScreen({ navigation }: SettingsProps) {
    return (
        <scrollView className="p-4">
            <Card className="mb-4">
                <label className="text-xl font-bold mb-4">Notifications</label>
                <gridLayout rows="auto, auto" columns="*, auto" className="gap-2">
                    <label row="0" col="0">Expiration Alerts</label>
                    <switch row="0" col="1" checked={true} />
                    
                    <label row="1" col="0">Meal Suggestions</label>
                    <switch row="1" col="1" checked={true} />
                </gridLayout>
            </Card>

            <Card className="mb-4">
                <label className="text-xl font-bold mb-4">Dietary Preferences</label>
                <stackLayout>
                    <button className="p-2 bg-gray-100 rounded-lg mb-2">
                        Vegetarian
                    </button>
                    <button className="p-2 bg-gray-100 rounded-lg mb-2">
                        Gluten Free
                    </button>
                    <button className="p-2 bg-gray-100 rounded-lg">
                        Dairy Free
                    </button>
                </stackLayout>
            </Card>

            <Card className="mb-4">
                <label className="text-xl font-bold mb-4">Data Management</label>
                <Button 
                    text="Export Data"
                    variant="secondary"
                    className="mb-2"
                    onTap={() => {/* TODO: Implement export */}}
                />
                <Button 
                    text="Clear All Data"
                    variant="danger"
                    onTap={() => {/* TODO: Implement clear data */}}
                />
            </Card>
        </scrollView>
    );
}