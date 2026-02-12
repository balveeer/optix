'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LoaderProps {
    text?: string;
    fullScreen?: boolean;
}

export function Loader({ text = 'Loading...', fullScreen = true }: LoaderProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-6 ${fullScreen ? 'fixed inset-0 bg-background z-50' : 'py-20'
                }`}
        >
            {/* Animated Logo */}
            <div className="relative">
                {/* Outer glow ring */}
                <motion.div
                    className="absolute -inset-4 rounded-full"
                    style={{
                        background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 50%, #C084FC 100%)',
                        opacity: 0.3,
                        filter: 'blur(20px)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Spinning ring */}
                <motion.div
                    className="absolute -inset-2 rounded-full border-2 border-transparent"
                    style={{
                        borderTopColor: '#A855F7',
                        borderRightColor: '#C084FC',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />

                {/* Logo container with pulse */}
                <motion.div
                    className="relative w-20 h-20 rounded-full overflow-hidden bg-background flex items-center justify-center"
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <Image
                        src="/images/optixlogomobilet.png"
                        alt="Loading"
                        width={64}
                        height={64}
                        className="object-contain"
                        priority
                    />
                </motion.div>
            </div>

            {/* Loading text with shimmer effect */}
            <motion.p
                className="text-lg font-medium bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 100%' }}
                animate={{
                    backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            >
                {text}
            </motion.p>

            {/* Bouncing dots */}
            <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

// Mini loader for inline use
export function MiniLoader({ className = '' }: { className?: string }) {
    return (
        <motion.div
            className={`w-6 h-6 rounded-full border-2 border-primary border-t-transparent ${className}`}
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
            }}
        />
    );
}
