export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#050505]">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-[#E3B658]/20 rounded-full"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-t-[#E3B658] rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
