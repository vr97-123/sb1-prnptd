import { BarcodeScanner } from 'nativescript-barcodescanner';
import { Camera, requestPermissions } from '@nativescript/camera';
import { ImageSource } from '@nativescript/core';
import { createWorker } from 'tesseract.js';

export async function scanBarcode(): Promise<string> {
    const scanner = new BarcodeScanner();
    const available = await scanner.available();
    if (!available) {
        throw new Error('Barcode scanning not available');
    }

    const hasPermission = await scanner.requestPermissions();
    if (!hasPermission) {
        throw new Error('Permission denied');
    }

    const result = await scanner.scan({
        formats: ["QR_CODE", "EAN_13", "EAN_8", "UPC_A"],
        message: "Place the barcode inside the rectangle to scan it.",
    });

    return result.text;
}

export async function takePhoto(): Promise<ImageSource> {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
        throw new Error('Camera permission denied');
    }

    const image = await Camera.takePicture();
    return ImageSource.fromAsset(image);
}

export async function scanReceipt(imageSource: ImageSource): Promise<string> {
    const worker = await createWorker();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const { data: { text } } = await worker.recognize(imageSource.toBase64String('png'));
    await worker.terminate();

    return text;
}