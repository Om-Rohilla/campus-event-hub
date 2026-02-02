import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, CameraOff, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface QRScannerProps {
    onScan: (data: string) => void;
    onError?: (error: string) => void;
    isActive?: boolean;
}

interface ScanResult {
    success: boolean;
    message: string;
    data?: string;
}

const QRScanner = ({ onScan, onError, isActive = true }: QRScannerProps) => {
    const [isScanning, setIsScanning] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [lastResult, setLastResult] = useState<ScanResult | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const startScanner = async () => {
        if (!containerRef.current || scannerRef.current) return;

        try {
            const html5QrCode = new Html5Qrcode('qr-reader');
            scannerRef.current = html5QrCode;

            await html5QrCode.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1
                },
                (decodedText) => {
                    // Success callback
                    setLastResult({
                        success: true,
                        message: 'QR Code scanned successfully!',
                        data: decodedText
                    });
                    onScan(decodedText);

                    // Brief pause before next scan
                    setTimeout(() => {
                        setLastResult(null);
                    }, 2000);
                },
                () => {
                    // Ignore QR not found errors during scanning
                }
            );

            setIsScanning(true);
            setHasPermission(true);
        } catch (err: any) {
            console.error('Scanner error:', err);
            setHasPermission(false);

            if (err.toString().includes('Permission')) {
                onError?.('Camera permission denied. Please allow camera access.');
            } else {
                onError?.('Failed to start scanner. Please try again.');
            }
        }
    };

    const stopScanner = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                scannerRef.current.clear();
            } catch (err) {
                console.error('Error stopping scanner:', err);
            }
            scannerRef.current = null;
        }
        setIsScanning(false);
    };

    useEffect(() => {
        if (isActive) {
            startScanner();
        } else {
            stopScanner();
        }

        return () => {
            stopScanner();
        };
    }, [isActive]);

    const toggleScanner = () => {
        if (isScanning) {
            stopScanner();
        } else {
            startScanner();
        }
    };

    return (
        <div className="flex flex-col items-center">
            {/* Scanner Container */}
            <div className="relative w-full max-w-sm">
                <div
                    id="qr-reader"
                    ref={containerRef}
                    className="w-full rounded-2xl overflow-hidden bg-black"
                    style={{ minHeight: isScanning ? 300 : 0 }}
                />

                {/* Overlay when not scanning */}
                {!isScanning && (
                    <div className="w-full h-64 rounded-2xl bg-muted/50 border-2 border-dashed border-border flex flex-col items-center justify-center gap-4">
                        {hasPermission === false ? (
                            <>
                                <AlertCircle className="w-12 h-12 text-destructive" />
                                <div className="text-center px-4">
                                    <p className="font-medium text-foreground">Camera Access Required</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Please allow camera access to scan QR codes
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <Camera className="w-12 h-12 text-muted-foreground" />
                                <div className="text-center">
                                    <p className="font-medium text-foreground">QR Scanner</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Click below to start scanning
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Scan Result Overlay */}
                {lastResult && isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-2xl">
                        <div className="text-center p-6">
                            {lastResult.success ? (
                                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
                            ) : (
                                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-3" />
                            )}
                            <p className={`font-semibold ${lastResult.success ? 'text-green-500' : 'text-red-500'}`}>
                                {lastResult.message}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <button
                onClick={toggleScanner}
                className={`mt-4 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${isScanning
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
            >
                {isScanning ? (
                    <>
                        <CameraOff className="w-5 h-5" />
                        Stop Scanner
                    </>
                ) : (
                    <>
                        <Camera className="w-5 h-5" />
                        Start Scanner
                    </>
                )}
            </button>

            {/* Instructions */}
            {isScanning && (
                <p className="text-sm text-muted-foreground mt-3 text-center">
                    Position the QR code within the frame to scan
                </p>
            )}
        </div>
    );
};

export default QRScanner;
