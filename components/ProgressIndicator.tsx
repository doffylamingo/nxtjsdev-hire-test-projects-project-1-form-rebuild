interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export default function ProgressIndicator({ currentStep, totalSteps, labels }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {labels.map((label, index) => {
          const stepNum = index + 1
          const isActive = stepNum === currentStep
          const isCompleted = stepNum < currentStep
          return (
            <div key={stepNum} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted
                    ? "bg-gray-800 text-green-500"
                    : isActive
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {stepNum}
              </div>
              <span
                className={`text-xs mt-1 ${
                  isActive ? "text-gray-800 font-medium" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-gray-800 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}
