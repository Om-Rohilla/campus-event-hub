import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Check, Loader2 } from 'lucide-react';

interface QRCodeDisplayProps {
    data: string;
    title?: string;
    subtitle?: string;
    size?: number;
    showActions?: boolean;
    className?: string;
}

const QRCodeDisplay = ({
    data,
    title,
    subtitle,
    size = 200,
    showActions = true,
    className = ''
}: QRCodeDisplayProps) => {
    const [qrDataUrl, setQrDataUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const generateQR = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // Generate at 2x resolution for crisp display on high-DPI screens
                const url = await QRCode.toDataURL(data, {
                    width: size * 2,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    },
                    errorCorrectionLevel: 'H' // High error correction for better scanning
                });
                setQrDataUrl(url);
            } catch (err) {
                setError('Failed to generate QR code');
                console.error('QR generation error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (data) {
            generateQR();
        }
    }, [data, size]);

    const handleDownload = () => {
        if (!qrDataUrl) return;

        const link = document.createElement('a');
        link.download = `qr-${title?.replace(/\s+/g, '-').toLowerCase() || 'code'}.png`;
        link.href = qrDataUrl;
        link.click();
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(data);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    if (error) {
        return (
            <div className={`flex flex-col items-center justify-center p-6 bg-red-50 rounded-xl ${className}`}>
                <p className="text-red-600 text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center ${className}`}>
            {/* QR Code Container */}
            <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg border border-border/50">
                {isLoading ? (
                    <div
                        className="flex items-center justify-center bg-muted/50 rounded-lg sm:rounded-xl"
                        style={{ width: size, height: size }}
                    >
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : (
                    <img
                        src={qrDataUrl}
                        alt="QR Code"
                        style={{ width: size, height: size, minWidth: size, minHeight: size }}
                        className="rounded-lg sm:rounded-xl block"
                    />
                )}
            </div>

            {/* Title & Subtitle */}
            {(title || subtitle) && (
                <div className="text-center mt-4">
                    {title && (
                        <h3 className="font-semibold text-foreground">{title}</h3>
                    )}
                    {subtitle && (
                        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                    )}
                </div>
            )}

            {/* Actions */}
            {showActions && !isLoading && (
                <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
                    <button
                        onClick={handleDownload}
                        data-download-qr
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary text-white text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Save QR
                    </button>
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-muted text-foreground text-xs sm:text-sm font-medium hover:bg-muted/80 transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                Copy
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default QRCodeDisplay;
