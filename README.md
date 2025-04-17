# Toast-X

A lightweight, customizable toast notification library for React applications with TypeScript support.

## Features

- 🚀 **Lightweight**: Small footprint with minimal dependencies
- 💅 **Customizable**: Easily customize appearance, positions, animations, and more
- ⚡ **Performant**: Built with Framer Motion for smooth animations
- 🌗 **Dark Mode**: Automatically adapts to light/dark themes
- 🎨 **Tailwind Integration**: Pre-styled with Tailwind CSS
- 📱 **Responsive**: Works on all device sizes
- ♿ **Accessible**: Focus management and screen reader support
- 🔥 **Premium Features**: Action buttons, rich content, progress bars, and more

## Installation

```bash
npm install toast-x
```

## Usage

```jsx
import { ToastProvider, useToast } from 'toast-x';
import 'toast-x/styles.css';

// Wrap your app with the ToastProvider
function App() {
  return (
    <ToastProvider>
      <YourComponent />
    </ToastProvider>
  );
}

// Use the toast hook in any component
function YourComponent() {
  const { toast, success, error, info, warning } = useToast();
  
  return (
    <div>
      <button onClick={() => toast('Hello World!')}>
        Show Toast
      </button>
      <button onClick={() => success('Operation successful!')}>
        Show Success
      </button>
    </div>
  );
}
```

## API Reference

### ToastProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultOptions` | `ToastOptions` | See below | Default options for all toasts |
| `maxToasts` | `number` | `10` | Maximum number of toasts to show at once |
| `newestOnTop` | `boolean` | `true` | Whether to show newest toasts on top |

### Toast Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `'success' \| 'error' \| 'info' \| 'warning' \| 'loading' \| 'custom'` | `'info'` | Type of toast |
| `duration` | `number \| false` | `5000` | Duration in ms, `false` to disable auto-closing |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | Position on screen |
| `animation` | `'slide' \| 'fade' \| 'scale' \| 'bounce' \| 'flip'` | `'slide'` | Animation type |
| `dismissible` | `boolean` | `true` | Whether toast can be dismissed by clicking |
| `progressBar` | `boolean` | `false` | Show progress bar for remaining time |
| `pauseOnHover` | `boolean` | `true` | Pause timer when hovering |
| `className` | `string` | `''` | Additional CSS classes |
| `sound` | `boolean \| string` | `false` | Play sound when toast appears |
| `richContent` | `boolean` | `false` | Enable markdown rendering |
| `action` | `{ label: string, onClick: () => void, theme?: 'primary' \| 'secondary' \| 'danger' }` | `undefined` | Add action button |
| `priority` | `number` | `0` | Priority level (higher shows first) |
| `group` | `string` | `undefined` | Group identifier |
| `zIndex` | `number` | `undefined` | Custom z-index |
| `onClose` | `() => void` | `undefined` | Callback when toast closes |

### Toast API

| Method | Description |
|--------|-------------|
| `toast(content, options?)` | Show a basic toast |
| `success(content, options?)` | Show a success toast |
| `error(content, options?)` | Show an error toast |
| `info(content, options?)` | Show an info toast |
| `warning(content, options?)` | Show a warning toast |
| `loading(content, options?)` | Show a loading toast |
| `custom(content, options?)` | Show a custom toast |
| `update(id, options)` | Update an existing toast |
| `dismiss(id)` | Dismiss a specific toast |
| `dismissAll()` | Dismiss all toasts |
| `isActive(id)` | Check if a toast is active |
| `pause(id)` | Pause a toast's timer |
| `resume(id)` | Resume a toast's timer |
| `pauseAll()` | Pause all toast timers |
| `resumeAll()` | Resume all toast timers |

## Premium Features

Toast-X comes with several premium features that set it apart:

- **Interactive Toasts**: Add action buttons to your toasts
- **Rich Content**: Support for markdown and formatting
- **Progress Bars**: Visual indicator of remaining time
- **Sound Notifications**: Play sounds when toasts appear
- **Pause on Hover**: Pause timers when users hover
- **Draggable Toasts**: Swipe to dismiss on all devices
- **Priority System**: Control which toasts appear first
- **Toast Groups**: Categorize related notifications
- **Queue Management**: Control how multiple toasts appear

## License

MIT