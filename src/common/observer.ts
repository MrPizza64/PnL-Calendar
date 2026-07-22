import { useRef, useState, useEffect } from "react";

export function useObserver(options = {}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
            setVisible(entry.isIntersecting);
            },
            { threshold: 0.15, ...options }
        );
        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return { ref, visible };
}