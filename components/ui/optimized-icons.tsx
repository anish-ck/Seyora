// Optimized icon imports - only load what we need
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

// Define only the icons we actually use to help with tree shaking
export type IconName =
    | 'home'
    | 'search'
    | 'person'
    | 'settings'
    | 'menu'
    | 'close'
    | 'chevron-back'
    | 'chevron-forward'
    | 'chevron-down'
    | 'calendar'
    | 'time'
    | 'checkmark'
    | 'information-circle'
    | 'help-circle'
    | 'eye'
    | 'eye-off'
    | 'mail'
    | 'lock-closed'
    | 'phone-portrait'
    | 'card'
    | 'location'
    | 'business'
    | 'medical'
    | 'airplane'
    | 'bed'
    | 'restaurant'
    | 'car'
    | 'walk'
    | 'camera'
    | 'image'
    | 'document'
    | 'star'
    | 'heart'
    | 'share'
    | 'bookmark'
    | 'filter'
    | 'map'
    | 'notifications'
    | 'warning'
    | 'alert-circle'
    | 'refresh'
    | 'download'
    | 'cloud-upload'
    | 'trash'
    | 'edit'
    | 'add'
    | 'remove'
    | 'call'
    | 'chatbubble'
    | 'mail-open'
    | 'globe'
    | 'wifi'
    | 'bluetooth'
    | 'battery-full'
    | 'volume-high'
    | 'play'
    | 'pause'
    | 'stop'
    | 'skip-forward'
    | 'skip-backward';

interface OptimizedIconProps {
    name: IconName;
    size?: number;
    color?: string;
}

// Type-safe version using actual Ionicons props
type IoniconsProps = ComponentProps<typeof Ionicons>;
interface TypeSafeIconProps extends Omit<IoniconsProps, 'name'> {
    name: IconName;
}

export function OptimizedIcon({ name, size = 24, color = '#000', ...props }: TypeSafeIconProps) {
    return <Ionicons name={name as IoniconsProps['name']} size={size} color={color} {...props} />;
}

// Re-export for backward compatibility
export { Ionicons };