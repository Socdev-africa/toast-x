# Notify-toast

> **Summary:**  
> **notify-toast** is a lightweight React toast library written in TypeScript that leverages Framer Motion for smooth, interruptible animations and provides out‑of‑the‑box support for rich content, actions, and sound notifications. This guide walks you through installation, setup, API reference, advanced features (updating/dismissing toasts), accessibility considerations (ARIA live regions, focus management), styling/theming, SSR support, performance tips, and testing strategies, so you can ship polished, inclusive notifications in any React app.

---

## 📦 Installation

```bash
npm install notify-toast
# or
yarn add notify-toast
```  
Installation is as simple as adding a single dependency; no peer‑dependencies required. citeturn0search8

---

## ⚙️ Basic Setup

1. **Wrap** your application with the provider at the root:  
   ```tsx
   import { ToastProvider } from 'notify-toast';
   import 'notify-toast/styles.css';

   function App() {
     return (
       <ToastProvider
         defaultOptions={{
           position: 'top-right',
           duration: 5000,
           animation: 'slide',
         }}
         maxToasts={5}
         newestOnTop
       >
         <YourRoutesOrComponents />
       </ToastProvider>
     );
   }
   ```
2. **Invoke** toasts anywhere via the hook:  
   ```tsx
   import { useToast } from 'notify-toast';

   function Demo() {
     const { toast, success, error, info, warning } = useToast();
     return (
       <>
         <button onClick={() => toast('Hello World!')}>Default</button>
         <button onClick={() => success('It worked!')}>Success</button>
       </>
     );
   }
   ```
This pattern mirrors popular libraries like React‑Toastify but brings a smaller footprint and TypeScript‑first API. citeturn1search0turn1search2

---

## 🔧 API Reference

### 1. ToastProvider Props

| Prop              | Type                 | Default       | Description                                                                       |
|-------------------|----------------------|---------------|-----------------------------------------------------------------------------------|
| `defaultOptions`  | `ToastOptions`       | See below     | Global defaults for all toasts (position, duration, animation, etc.).             |
| `maxToasts`       | `number`             | `10`          | Maximum simultaneous toasts; extras are queued.                                   |
| `newestOnTop`     | `boolean`            | `true`        | Render newest notifications on top of the stack.                                  |

### 2. ToastOptions

| Option         | Type                                                                                                                                  | Default        | Description                                                                                                                                                             |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`         | `'success' \| 'error' \| 'info' \| 'warning' \| 'loading' \| 'custom'`                                                                    | `'info'`       | Semantic style and icon.                                                                                                                                                 |
| `duration`     | `number \| false`                                                                                                                      | `5000`         | Auto‑dismiss after ms; `false` to stay until user action.                                                                                                                |
| `position`     | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'`                                      | `'top-right'`  | Screen corner; matches React‑Toastify positions. citeturn1search9                                                                                                      |
| `animation`    | `'slide' \| 'fade' \| 'scale' \| 'bounce' \| 'flip'`                                                                                   | `'slide'`      | Mount/unmount animation, powered by Framer Motion. citeturn2search1                                                                                                  |
| `dismissible`  | `boolean`                                                                                                                              | `true`         | Show “×” close button.                                                                                                                                                    |
| `progressBar`  | `boolean`                                                                                                                              | `false`        | Display remaining‑time indicator.                                                                                                                                         |
| `pauseOnHover` | `boolean`                                                                                                                              | `true`         | Suspend timer on pointer hover.                                                                                                                                           |
| `className`    | `string`                                                                                                                               | `''`           | Append root-level CSS classes for fully custom styling.                                                                                                                   |
| `sound`        | `boolean \| string`                                                                                                                    | `false`        | Play default or specified audio on show.                                                                                                                                  |
| `richContent`  | `boolean`                                                                                                                              | `false`        | Interpret Markdown (via remark) for formatted messages.                                                                                                                  |
| `action`       | `{ label: string; onClick: () => void; theme?: 'primary' \| 'secondary' \| 'danger' }`                                                | `undefined`    | Add inline button—great for “Undo” flows.                                                                                                                                |
| `priority`     | `number`                                                                                                                               | `0`            | Higher-priority toasts jump the queue.                                                                                                                                   |
| `group`        | `string`                                                                                                                               | `undefined`    | Logical grouping to clear/dismiss in batches.                                                                                                                            |
| `zIndex`       | `number`                                                                                                                               | `undefined`    | Manually override stacking context.                                                                                                                                       |
| `onClose`      | `() => void`                                                                                                                           | `undefined`    | Callback after a toast fully animates out.                                                                                                                               |

### 3. Hook Methods

| Method                | Description                                                                            |
|-----------------------|----------------------------------------------------------------------------------------|
| `toast(content, opts?)`    | Generic, neutral toast.                                                              |
| `success(content, opts?)`  | Green checkmark style—denotes success.                                             |
| `error(content, opts?)`    | Red cross style—denotes failure.                                                    |
| `info(content, opts?)`     | Blue “i” icon—information messages.                                                 |
| `warning(content, opts?)`  | Amber triangle—warnings/confirmations.                                              |
| `loading(content, opts?)`  | Spinner style—useful for async flows; returns `id` to `update()`.                   |
| `custom(content, opts?)`   | Use custom icons, colors, or animations.                                            |
| `update(id, options)`      | Morph an existing toast (e.g. from loading→success).                                 |
| `dismiss(id)`              | Programmatically remove one toast.                                                  |
| `dismissAll()`             | Clear all toasts (e.g. on route change).                                            |
| `isActive(id)`             | Boolean: is the toast still visible?                                                |
| `pause(id)` / `resume(id)` | Temporarily halt or restart a toast’s timer—ideal for hover or focus controls.       |
| `pauseAll()` / `resumeAll()`| Global timer controls (e.g., on window blur/focus).                                |

---

## 📚 Detailed Example

Below is the **exact** integration from your `App.tsx`—annotated to explain each feature:

```tsx
import './App.css';
import { useEffect } from 'react';
import AppRoutes from './routes/routes';

// 1) Bring in provider and hook
import { ToastProvider, useToast } from 'notify-toast';
import 'notify-toast/styles.css';

function ToastDemo() {
  const {
    toast, success, error, info, warning,
    loading, custom, update, dismissAll
  } = useToast();

  useEffect(() => {
    // 2) Show default toast
    toast('Default notification', { position: 'top-right' });

    // 3) Success after delay
    setTimeout(() => {
      success('Completed successfully!', {
        progressBar: true, duration: 4000
      });
    }, 1000);

    // 4) Error at bottom-left with bounce animation
    setTimeout(() => {
      error('Something went wrong.', {
        position: 'bottom-left', animation: 'bounce', duration: 5000
      });
    }, 2000);

    // 5) Rich Markdown content
    setTimeout(() => {
      info(
        '# Info\n\n- **Point A**\n- **Point B**',
        { richContent: true, duration: 6000 }
      );
    }, 3000);

    // 6) Warning with action button
    setTimeout(() => {
      warning('Delete this item?', {
        action: {
          label: 'Undo',
          onClick: () => info('Undo success!'),
          theme: 'danger'
        },
        duration: 7000
      });
    }, 4000);

    // 7) Loading → update to success
    setTimeout(() => {
      const id = loading('Loading data...', { animation: 'fade' });
      setTimeout(() => {
        update(id, {
          type: 'success',
          content: 'Data loaded!',
          duration: 2000
        });
      }, 3000);
    }, 5000);

    // 8) Custom toast with sound
    setTimeout(() => {
      custom('🎉 Celebratory toast!', {
        sound: true, animation: 'flip', progressBar: true
      });
    }, 9000);

    // 9) Cleanup on unmount
    return () => dismissAll();
  }, []);

  return null;
}

function AppContent() {
  return (
    <>
      <AppRoutes />
      <ToastDemo />
    </>
  );
}

export default function App() {
  return (
    <div className="open-sans">
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </div>
  );
}
```

---

## ♿ Accessibility  
- **ARIA Live Regions**: Toasts render inside a `<div aria-live="assertive">` by default, ensuring screen readers announce them immediately citeturn0search0turn0search4.  
- **Alertdialog Role**: Each toast uses `role="alertdialog"` so users can navigate via F6/Shift+F6 landmarks citeturn0search1.  
- **Focus Management**: Dismissal restores focus to prior element or next toast, avoiding keyboard traps citeturn0search3.  
- **Pause/Resume**: Hover or focus events pause timers, letting assistive tech read long messages fully citeturn0search6.

---

## 🎨 Theming & Styles  
- **Tailwind Ready**: Core CSS is minimal; extend via `className` or override variables in your Tailwind config.  
- **Dark Mode**: Detects `prefers-color-scheme` and switches automatically; override with `data-theme` attribute.  
- **Custom Animations**: Supply any Framer Motion `variants` for enter/exit by using the `animation` prop or `custom` to fully override. citeturn2search1

---

## 🚀 Advanced Usage

### Updating & Queuing  
- Use `priority` to bump urgent toasts ahead of queued ones.  
- `group` + `dismissAll('groupName')` to clear related notifications.

### Server‑Side Rendering  
- ToastProvider guards against DOM usage on the server; no build‑time errors.  

### Performance  
- Minimal re‑renders: only the toast list component updates.  
- Batch updates internally via React’s `useTransition`, avoiding jank.  

---

## ✅ Testing

- **Unit**: Mock `useToast()` and assert calls to `toast()`, `update()`, etc.  
- **E2E**: Use Cypress or Playwright to trigger notifications and verify presence in the DOM (via `[role="alertdialog"]`).  

---

## 🤝 Contributing

1. Fork the repo  
2. Create issues/PRs, label “good first issue” for newcomers  
3. CI runs on GitHub Actions—lint, type‑check, and publish on tags  

---

## 📝 License

MIT © Salvato luis

---

By following this guide—and leveraging the power of Framer Motion animations, ARIA best practices, and a concise hook‑based API—you’ll ship robust, accessible notifications that delight users and integrate seamlessly into any React codebase.