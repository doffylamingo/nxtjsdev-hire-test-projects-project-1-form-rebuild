import type { StepProps } from "@/types"

export default function StepReview({ data, updateFields }: StepProps) {
  const displayAmount = data.presetAmount !== null
    ? `$${data.presetAmount}`
    : `$${data.customAmount}`

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm mb-1">Message (optional)</label>
        <textarea
          id="message"
          value={data.message}
          onChange={(e) => updateFields({ message: e.target.value })}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="border border-gray-200 rounded p-4 bg-gray-50 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Review your donation</h3>
        <p className="text-sm">
          <span className="text-gray-500">Name:</span> {data.firstName} {data.lastName}
        </p>
        <p className="text-sm">
          <span className="text-gray-500">Email:</span> {data.email}
        </p>
        <p className="text-sm">
          <span className="text-gray-500">Amount:</span> {displayAmount}
        </p>
        {data.message && (
          <p className="text-sm">
            <span className="text-gray-500">Message:</span> {data.message}
          </p>
        )}
      </div>
    </div>
  )
}
