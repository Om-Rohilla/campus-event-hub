import { useRef, KeyboardEvent, ClipboardEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';

interface OTPInputProps {
    value: string[];
    onChange: (value: string[]) => void;
    length?: number;
}

const OTPInput = ({ value, onChange, length = 6 }: OTPInputProps) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        if (!/^\d*$/.test(val)) return; // Only allow digits

        const newValue = [...value];
        newValue[index] = val.slice(-1); // Only take last character
        onChange(newValue);

        // Auto-focus next input
        if (val && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);

        if (!/^\d+$/.test(pastedData)) return;

        const newValue = pastedData.split('').concat(Array(length).fill('')).slice(0, length);
        onChange(newValue);

        // Focus last filled input or next empty
        const nextIndex = Math.min(pastedData.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
    };

    return (
        <div className="flex gap-2 sm:gap-3 justify-center">
            {Array.from({ length }).map((_, index) => (
                <motion.input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ''}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold rounded-lg border-2 border-border bg-card text-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                />
            ))}
        </div>
    );
};

export default OTPInput;
