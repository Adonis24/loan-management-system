// packages
import { Keyboard } from 'react-native';
/**
 * Attaches an event listener that handles the android-only hardware
 * back button
 * @param  {Function} callback The function to call on click
 */
const keyboardBeingDisplay = callback => {
    Keyboard.addListener('keyboardDidShow', () => {
        callback();
        return true;
    });
};

const keyboardBeingClose = callback => {
    Keyboard.addListener('keyboardDidHide', () => {
        callback();
        return true;
    });
};
/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
// const removeAndroidBackButtonHandler = () => {
//     BackHandler.removeEventListener('hardwareBackPress', () => { });
// }
export { keyboardBeingDisplay,keyboardBeingClose };