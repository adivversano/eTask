import { useEffect } from 'react'

export const useOutsideEvent = (ref, func) => {
    useEffect(() => {
        const handleClickOutside = (ev) => {
            if (ref?.current && !ref?.current.contains(ev.target)) {
                func();
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);
}
