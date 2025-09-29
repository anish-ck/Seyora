import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Shield,
  Database,
  Wallet,
  Award,
  QrCode,
  User,
  X,
  Loader2,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const steps = [
  { id: 1, title: "Validating Email", icon: Shield, desc: "Checking email authenticity..." },
  { id: 2, title: "Verifying Identity", icon: Shield, desc: "Confirming user credentials..." },
  { id: 3, title: "Uploading Securely", icon: Database, desc: "Encrypting and storing data..." },
  { id: 4, title: "Creating Wallet", icon: Wallet, desc: "Generating secure wallet..." },
  { id: 5, title: "Minting Tourist NFT", icon: Award, desc: "Creating digital identity..." },
  { id: 6, title: "Finalizing Data", icon: Database, desc: "Securing final details..." },
  { id: 7, title: "Complete!", icon: CheckCircle, desc: "Registration successful!" },
];

interface ProgressPopoverProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentStep: number;
  error?: string;
  qrCodeUrl?: string;
  onAbort: () => void;
}

export const ProgressPopover: React.FC<ProgressPopoverProps> = ({
  isOpen,
  onOpenChange,
  currentStep,
  error,
  qrCodeUrl,
  onAbort,
}) => {
  const progress = Math.min((currentStep / steps.length) * 100, 100);
  const isCompleted = currentStep >= steps.length;
  const hasError = !!error;
  const currentStepInfo = steps[currentStep - 1];

  const handleVisitUserManagement = () => {
    window.open("/user-management", "_blank");
  };

  return (
    <>
      {/* Purple backdrop */}
      <div 
        className={`fixed inset-0 bg-purple-900/70 backdrop-blur-md z-40 transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg max-w-md bg-black/95 border-purple-500/40 shadow-2xl shadow-purple-500/30 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-black/60 to-purple-950/40 rounded-lg" />
          
          <div className="relative z-10">
            <DialogHeader className="pb-2">
              <DialogTitle className="text-xl font-bold text-center bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">
                {hasError ? "Registration Failed" : isCompleted ? "Welcome Aboard!" : "Registration in Progress"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Active Progress Section */}
              {!hasError && !isCompleted && (
                <div className="space-y-4">
                  {/* Current Step Highlight */}
                  {currentStepInfo && (
                    <div className="p-4 bg-gradient-to-r from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="p-2 bg-purple-600 rounded-full">
                            <currentStepInfo.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="absolute -inset-1 bg-purple-400/30 rounded-full animate-ping" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-purple-200 text-sm">
                            {currentStepInfo.title}
                          </h3>
                          <p className="text-purple-400 text-xs">
                            {currentStepInfo.desc}
                          </p>
                        </div>
                        <Loader2 className="h-4 w-4 text-purple-400 animate-spin" />
                      </div>
                    </div>
                  )}

                  {/* Animated Progress Bar */}
                  <div className="space-y-2">
                    <div className="relative">
                      <Progress 
                        value={progress} 
                        className="h-2 bg-gray-800/50 border border-purple-500/20"
                      />
                      <div 
                        className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                      {/* Moving shimmer effect */}
                      <div 
                        className="absolute top-0 h-2 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"
                        style={{ 
                          left: `${Math.max(0, progress - 8)}%`,
                          transition: 'left 1s ease-out'
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-300 font-medium">
                        Step {currentStep} of {steps.length}
                      </span>
                      <span className="text-purple-400">
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mini Steps Overview */}
              {!hasError && !isCompleted && (
                <div className="flex justify-center space-x-1">
                  {steps.map((step) => {
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;
                    
                    return (
                      <div
                        key={step.id}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isCompleted
                            ? "bg-purple-400 shadow-sm shadow-purple-400/50"
                            : isActive
                            ? "bg-purple-500 animate-pulse w-6"
                            : "bg-gray-600"
                        }`}
                      />
                    );
                  })}
                </div>
              )}

              {/* Error Display */}
              {hasError && (
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-400 animate-pulse" />
                    <div>
                      <h4 className="font-semibold text-red-300 text-sm">Error Occurred</h4>
                      <p className="text-red-400/90 text-xs">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Display */}
              {isCompleted && !hasError && (
                <div className="space-y-4 text-center">
                  <div className="relative">
                    <CheckCircle className="h-12 w-12 text-purple-400 mx-auto" />
                    <div className="absolute inset-0 h-12 w-12 mx-auto bg-purple-400/20 rounded-full animate-ping" />
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-200 text-lg">
                      Identity Created!
                    </h3>
                    <p className="text-purple-400 text-xs mt-1">
                      Your digital tourist identity is ready
                    </p>
                  </div>

                  {/* QR Code */}
                  {qrCodeUrl && (
                    <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                      <div className="bg-white p-2 rounded mx-auto w-fit">
                        <QRCodeCanvas value={qrCodeUrl} size={80} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                {isCompleted && !hasError && (
                  <>
                    <Button
                      onClick={handleVisitUserManagement}
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-xs"
                    >
                      <User className="h-3 w-3 mr-2" />
                      Open Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenChange(false)}
                      className="w-full border-purple-500/50 cursor-pointer text-purple-300 hover:bg-purple-800/20 text-xs"
                    >
                      Close
                    </Button>
                  </>
                )}


                {!isCompleted && !hasError && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full text-red-400 hover:bg-red-900/20 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black/95 border-purple-500/30 max-w-sm">
                      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 to-black/80 rounded-lg" />
                      <div className="relative z-10">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-red-400 text-sm">Cancel Registration?</AlertDialogTitle>
                          <AlertDialogDescription className="text-purple-300 text-xs">
                            This will stop the registration process. All progress will be lost.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-purple-500/50 text-purple-300 text-xs">
                            Continue
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={onAbort}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs"
                          >
                            Cancel Process
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};