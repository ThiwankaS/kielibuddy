import { motion } from "motion/react";
import type { ReactNode } from "react";

interface BuzzEffectProps {
    children : ReactNode;
    delay?: number;
}

export default function BuzzEffect ({ children, delay = 0 } : BuzzEffectProps) {
    return (
        <motion.div 
            animate = {{ 
                x: [0, 0, -2, 2, -2, 2, 0, 0],
                rotate: [0, 0, -1, 1, -1, 1, 0, 0]
            }}
            transition = {{
                duration :  2,
                repeat : Infinity,
                repeatType : "loop",
                delay : delay,
                times: [0.0, 0.8, 0.82, 0.84, 0.86, 0.88, 0.9, 1.0]
            }}
        >
            {children}
        </motion.div>
    );
}