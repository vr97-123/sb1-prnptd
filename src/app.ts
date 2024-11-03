import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: false });

// In NativeScript, the app.ts file is the entry point to your application.
ReactNativeScript.start(React.createElement(MainStack, {}, null));