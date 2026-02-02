import { motion } from 'framer-motion';
import { Calendar, Inbox } from 'lucide-react';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: 'calendar' | 'inbox';
    actionLabel?: string;
    onAction?: () => void;
}

const EmptyState = ({
    title,
    description,
    icon = 'inbox',
    actionLabel,
    onAction
}: EmptyStateProps) => {
    const Icon = icon === 'calendar' ? Calendar : Inbox;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 px-4"
        >
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                <Icon className="w-10 h-10 text-muted-foreground" />
            </div>

            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {title}
            </h3>

            <p className="text-muted-foreground text-center max-w-sm mb-6">
                {description}
            </p>

            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="btn-primary px-6 py-2.5 rounded-lg font-medium"
                >
                    {actionLabel}
                </button>
            )}
        </motion.div>
    );
};

export default EmptyState;
