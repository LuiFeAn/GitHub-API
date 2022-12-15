export {}

import getElementValue from "../utils/get-element-value";

declare global {
    interface Window {
        getElementValue: any;
    }
}
