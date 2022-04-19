
import { useSelector } from 'react-redux';
import { PopoverSaveTask } from './PopoverSaveTask/PopoverSaveTask';

export const DynamicPopover = () => {
    const { popover } = useSelector(state => state.appModule);
    const { type, props } = popover;
    switch (type) {
        case 'saveTask': return <PopoverSaveTask {...props} />;
        default: return '';
    }
}