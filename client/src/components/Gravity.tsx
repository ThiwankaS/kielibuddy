import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GravityProps {
    children : ReactNode;
}

const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

const PARTICLE_COUNT = 108;
const PARTICLES = Array.from({ length : PARTICLE_COUNT }).map((_, i) => {
    
    const radius = 10 + Math.random() * 10;
    const angle = Math.random() * Math.PI * 2;

    return {
            id          : i,
            x           : 50 + Math.cos(angle) * radius,
            y           : 50 + Math.sin(angle) * radius,
            size        : Math.random() * 3 + 2,
            duration    : Math.random() * 1 + 5,
            color       : colors[i % colors.length],
            driftX      : Math.random() * 12 - 10,
            driftY      : Math.random() * 12 - 10,   
    }
});

export default function Gravity ({ children } : GravityProps) {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f9fafb]">
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                { PARTICLES.map((t) => (
                    <motion.div
                        key={t.id}
                        className="absolute rounded-full"
                        style={{
                            width : t.size,
                            height : t.size,
                            backgroundColor : t.color,
                            top : `${t.y}%`,
                            left : `${t.x}%`,
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            x : [0, t.driftX, 0],
                            y : [0, t.driftY, 0],
                        }}
                        transition={{
                            duration : t.duration,
                            repeat : Infinity,
                            ease : "easeInOut",
                        }}
                    >
                    </motion.div> 
                ))}
                <div 
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(circle at center, transparent 20%, #f9fafb 80%)",
                        pointerEvents: 'none'
                    }} 
                />
                </div>
            <div className="relative w-full min-h-screen" style={{ zIndex: 10 }}>
                {children}
            </div>
        </div>
    );
}