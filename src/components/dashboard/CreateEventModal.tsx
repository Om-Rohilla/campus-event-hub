import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Users, FileText, Tag, Sparkles } from 'lucide-react';
import { CreateEventData, EventCategory } from '@/types';

interface CreateEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateEventData) => void;
}

const categories: { value: EventCategory; label: string }[] = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Cultural', label: 'Cultural' },
    { value: 'Career', label: 'Career' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Academic', label: 'Academic' },
    { value: 'Workshop', label: 'Workshop' },
    { value: 'Seminar', label: 'Seminar' },
    { value: 'Other', label: 'Other' },
];

const CreateEventModal = ({ isOpen, onClose, onSubmit }: CreateEventModalProps) => {
    const [formData, setFormData] = useState<CreateEventData>({
        title: '',
        description: '',
        date: '',
        time: '',
        endTime: '',
        location: '',
        category: 'Technology',
        capacity: 100,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof CreateEventData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof CreateEventData, string>> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Event title is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!formData.date) {
            newErrors.date = 'Date is required';
        }
        if (!formData.time) {
            newErrors.time = 'Start time is required';
        }
        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }
        if (formData.capacity < 1) {
            newErrors.capacity = 'Capacity must be at least 1';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        onSubmit(formData);
        setIsSubmitting(false);

        // Reset form
        setFormData({
            title: '',
            description: '',
            date: '',
            time: '',
            endTime: '',
            location: '',
            category: 'Technology',
            capacity: 100,
        });
        setErrors({});
    };

    const handleChange = (field: keyof CreateEventData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-display text-xl font-semibold text-foreground">
                                    Create New Event
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Fill in the details below
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)]">
                        <div className="p-6 space-y-5">
                            {/* Title */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    Event Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder="e.g., Tech Innovation Summit 2026"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.title ? 'border-destructive' : 'border-border'
                                        } bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive mt-1">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    placeholder="Describe your event..."
                                    rows={3}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-destructive' : 'border-border'
                                        } bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none`}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive mt-1">{errors.description}</p>
                                )}
                            </div>

                            {/* Date and Time */}
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => handleChange('date', e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.date ? 'border-destructive' : 'border-border'
                                            } bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                                    />
                                    {errors.date && (
                                        <p className="text-sm text-destructive mt-1">{errors.date}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) => handleChange('time', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.time ? 'border-destructive' : 'border-border'
                                            } bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                                    />
                                    {errors.time && (
                                        <p className="text-sm text-destructive mt-1">{errors.time}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                        End Time
                                    </label>
                                    <input
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) => handleChange('endTime', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    Location / Venue
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleChange('location', e.target.value)}
                                    placeholder="e.g., Main Auditorium, Block A"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.location ? 'border-destructive' : 'border-border'
                                        } bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                                />
                                {errors.location && (
                                    <p className="text-sm text-destructive mt-1">{errors.location}</p>
                                )}
                            </div>

                            {/* Category and Capacity */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                        <Tag className="w-4 h-4 text-muted-foreground" />
                                        Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleChange('category', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                                        <Users className="w-4 h-4 text-muted-foreground" />
                                        Capacity
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.capacity}
                                        onChange={(e) => handleChange('capacity', parseInt(e.target.value) || 0)}
                                        min={1}
                                        max={10000}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.capacity ? 'border-destructive' : 'border-border'
                                            } bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`}
                                    />
                                    {errors.capacity && (
                                        <p className="text-sm text-destructive mt-1">{errors.capacity}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border/50 bg-muted/30">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        Create Event
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CreateEventModal;
