import React, { useState, useEffect, useRef } from 'react';

// --- Icons ---
const MicOnIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 6v3m0 0v1m0-1h-1m1 0h1m-1-1v-3m0 0a7 7 0 017-7h-1a6 6 0 00-6 6v0a6 6 0 00-6-6H5a7 7 0 017 7z" /></svg>;
const MicOffIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.586 15.586a7 7 0 01-9.172 0M10 17v3m0 0v1m0-1h-1m1 0h1m-1-1v-3m0-1.086a7.002 7.002 0 01-5.914-2.278l-1.086-1.086A7 7 0 0110 4v0a7 7 0 015.586 11.586zM4.414 4.414L19.586 19.586" /></svg>;
const CamOnIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" /></svg>;
const CamOffIcon: React.FC<{className?: string}> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 1.263m-1.263-1.263L16.5 9.75M12 12.75l-4.5-4.5m4.5 4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;


interface VideoCallModalProps {
    isOpen: boolean;
    onClose: () => void;
    localUser: string;
    remoteUser: string;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, onClose, localUser, remoteUser }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [isMicOn, setIsMicOn] = useState(true);
    const [isCamOn, setIsCamOn] = useState(true);
    const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

    useEffect(() => {
        if (isOpen) {
            setCallStatus('connecting');
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    streamRef.current = stream;
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = stream;
                    }
                    // Simulate remote stream by using the same local stream
                     if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = stream;
                    }
                    setCallStatus('connected');
                })
                .catch(err => {
                    console.error("Error accessing media devices.", err);
                    setCallStatus('error');
                });
        }

        return () => {
            // Cleanup: Stop all tracks in the stream
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, [isOpen]);

    const toggleMic = () => {
        if (streamRef.current) {
            streamRef.current.getAudioTracks().forEach(track => {
                track.enabled = !isMicOn;
            });
            setIsMicOn(!isMicOn);
        }
    };

    const toggleCam = () => {
        if (streamRef.current) {
            streamRef.current.getVideoTracks().forEach(track => {
                track.enabled = !isCamOn;
            });
            setIsCamOn(!isCamOn);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-gray-900 rounded-lg shadow-xl w-full h-full flex flex-col relative text-white">

                {/* Main Video Area */}
                <div className="flex-grow relative flex justify-center items-center bg-black overflow-hidden">
                     <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                     <div className="absolute bottom-4 right-4 w-48 h-32 md:w-64 md:h-48 border-2 border-gray-500 rounded-md overflow-hidden bg-black">
                        <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100"></video>
                         <div className="absolute bottom-1 right-2 text-sm bg-black bg-opacity-50 px-2 py-1 rounded">{localUser} (أنت)</div>
                    </div>
                     <div className="absolute top-4 left-4 text-lg bg-black bg-opacity-50 px-3 py-1 rounded">
                        {callStatus === 'connecting' && 'جاري الاتصال...'}
                        {callStatus === 'connected' && `في مكالمة مع ${remoteUser}`}
                        {callStatus === 'error' && <span className="text-red-400">خطأ في الكاميرا/المايكروفون</span>}
                    </div>
                </div>


                {/* Controls */}
                <div className="bg-gray-800 bg-opacity-70 p-4 flex justify-center items-center gap-4">
                     <button 
                        onClick={toggleMic} 
                        className={`p-4 rounded-full transition-colors ${isMicOn ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'}`}
                        aria-label={isMicOn ? "Mute microphone" : "Unmute microphone"}
                    >
                        {isMicOn ? <MicOnIcon className="h-6 w-6" /> : <MicOffIcon className="h-6 w-6" />}
                    </button>
                     <button 
                        onClick={toggleCam} 
                        className={`p-4 rounded-full transition-colors ${isCamOn ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'}`}
                        aria-label={isCamOn ? "Turn off camera" : "Turn on camera"}
                    >
                        {isCamOn ? <CamOnIcon className="h-6 w-6" /> : <CamOffIcon className="h-6 w-6" />}
                    </button>
                    <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition-colors">
                        إنهاء المكالمة
                    </button>
                </div>
            </div>
        </div>
    );
};
