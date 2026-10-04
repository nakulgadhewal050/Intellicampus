import { GraduationCap } from "lucide-react";

function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-5 flex justify-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">IntelliCampus</h2>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
