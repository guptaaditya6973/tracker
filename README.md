# Leads Tracker

A lightweight Chrome extension to save, manage, and quickly access leads (links and text) for later reference.

## Features

- **Save Input**: Manually add custom text or links to your leads list
- **Save Current Tab**: Instantly capture the URL of the current browser tab
- **Persistent Storage**: All leads are saved locally using browser storage
- **Quick Access**: Click any saved lead to open it in a new tab
- **Delete All**: Clear all saved leads at once (double-click to confirm)

## Installation

1. Clone this repository or download the files
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked" and select the tracker folder
5. The extension icon will appear in your Chrome toolbar

## Usage

### Save a Lead Manually
1. Type text or a URL in the input field
2. Click the "SAVE INPUT" button
3. The lead will appear in the list below

### Save Current Tab
1. Click the "SAVE TAB" button
2. The current tab's URL will be added to your leads list

### View Saved Leads
- All saved leads appear as clickable links in the extension popup
- Click any link to open it in a new tab

### Delete All Leads
1. Double-click the "DELETE ALL" button
2. All saved leads will be cleared

## Files

- `manifest.json` - Chrome extension configuration
- `index.html` - Extension popup UI
- `index.css` - Styling for the popup
- `index.js` - JavaScript logic for extension functionality
- `icon.png` - Extension icon

## How It Works

- Leads are stored in the browser's local storage under the key `myLeads`
- Uses Chrome Tabs API to capture the current active tab URL
- Data persists across browser sessions

## Browser Support

- Chrome / Chromium-based browsers (Edge, Brave, Opera, etc.)

## License

This project is open source and available for personal or commercial use.

## Author

Created by [guptaaditya6973](https://github.com/guptaaditya6973)
