import { useRef, useState, useEffect } from "react";

export function useObserver(options = {}) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting);
        },
            { threshold: 0.15, ...options }
        );
        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();

    }, []);
    return { ref, visible };
}