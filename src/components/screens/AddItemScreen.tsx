import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet, alert } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { scanBarcode, takePhoto, scanReceipt } from "../../utils/scanner";
import { inventoryStore } from "../../store/inventory";

type AddItemProps = {
    route: RouteProp<MainStackParamList, "AddItem">,
    navigation: FrameNavigationProp<MainStackParamList, "AddItem">,
};

const CATEGORIES = [
    "Dairy", "Meat", "Vegetables", "Fruits", "Beverages",
    "Snacks", "Condiments", "Grains", "Other"
];

export function AddItemScreen({ navigation }: AddItemProps) {
    const [name, setName] = React.useState("");
    const [expiryDate, setExpiryDate] = React.useState(new Date());
    const [category, setCategory] = React.useState("");
    const [showCategories, setShowCategories] = React.useState(false);

    const handleSave = () => {
        if (!name || !category) {
            alert("Please fill in all required fields");
            return;
        }

        inventoryStore.addItem({
            name,
            category,
            expiryDate: expiryDate.toISOString(),
            quantity: 1
        });

        navigation.goBack();
    };

    const handleBarcodeScan = async () => {
        try {
            const barcodeText = await scanBarcode();
            // In a real app, you would look up the product details from a database
            setName(`Scanned Item: ${barcodeText}`);
        } catch (error) {
            alert("Error scanning barcode: " + error.message);
        }
    };

    const handlePhotoCapture = async () => {
        try {
            const image = await takePhoto();
            // In a real app, you would use ML to identify the product
            setName("Photo Captured Item");
        } catch (error) {
            alert("Error taking photo: " + error.message);
        }
    };

    const handleReceiptScan = async () => {
        try {
            const image = await takePhoto();
            const text = await scanReceipt(image);
            // In a real app, you would parse the receipt text to extract items
            alert("Receipt scanned! Text extracted: " + text.substring(0, 100) + "...");
        } catch (error) {
            alert("Error scanning receipt: " + error.message);
        }
    };

    return (
        <scrollView className="p-4">
            <stackLayout>
                <label className="text-2xl font-bold mb-4">Add New Item</label>
                
                {/* Input Form */}
                <stackLayout className="mb-4">
                    <label className="font-bold mb-1">Item Name</label>
                    <textField 
                        className="p-2 bg-white rounded-lg border-gray-300 border-width-1"
                        hint="Enter item name"
                        text={name}
                        onTextChange={(args) => setName(args.value)}
                    />
                </stackLayout>

                <stackLayout className="mb-4">
                    <label className="font-bold mb-1">Expiry Date</label>
                    <datePicker 
                        className="mb-2"
                        date={expiryDate}
                        onDateChange={(args) => setExpiryDate(args.value)}
                    />
                </stackLayout>

                <stackLayout className="mb-4">
                    <label className="font-bold mb-1">Category</label>
                    <button 
                        className="p-2 bg-white rounded-lg border-gray-300 border-width-1 text-left"
                        onTap={() => setShowCategories(!showCategories)}
                    >
                        {category || "Select Category"}
                    </button>
                    
                    {showCategories && (
                        <scrollView className="max-h-40 bg-white border-gray-300 border-width-1 rounded-lg mt-1">
                            {CATEGORIES.map((cat) => (
                                <button 
                                    key={cat}
                                    className="p-2 border-b-width-1 border-gray-200"
                                    onTap={() => {
                                        setCategory(cat);
                                        setShowCategories(false);
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </scrollView>
                    )}
                </stackLayout>

                {/* Action Buttons */}
                <gridLayout columns="*, *" className="gap-2">
                    <button 
                        col="0"
                        className="bg-gray-500 text-white p-4 rounded-lg"
                        onTap={() => navigation.goBack()}
                    >
                        Cancel
                    </button>
                    <button 
                        col="1"
                        className="bg-green-500 text-white p-4 rounded-lg"
                        onTap={handleSave}
                    >
                        Save Item
                    </button>
                </gridLayout>

                {/* Scanning Options */}
                <stackLayout className="mt-8">
                    <label className="text-xl font-bold mb-2">Quick Add Options</label>
                    <button 
                        className="p-4 bg-blue-500 text-white rounded-lg mb-2"
                        onTap={handleBarcodeScan}
                    >
                        Scan Barcode
                    </button>
                    <button 
                        className="p-4 bg-blue-500 text-white rounded-lg mb-2"
                        onTap={handlePhotoCapture}
                    >
                        Take Photo
                    </button>
                    <button 
                        className="p-4 bg-blue-500 text-white rounded-lg"
                        onTap={handleReceiptScan}
                    >
                        Scan Receipt
                    </button>
                </stackLayout>
            </stackLayout>
        </scrollView>
    );
}