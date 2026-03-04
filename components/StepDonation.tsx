import type { StepProps } from "@/types"

export default function StepDonation({ data, updateFields }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <span className="block text-sm mb-2">Donation amount</span>
        <div className="flex gap-2 flex-wrap mb-2">
          {[10, 25, 50, 100].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => updateFields({ presetAmount: amount, customAmount: "" })}
              className={`px-4 py-2 border rounded ${
                data.presetAmount === amount
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Custom amount"
          value={data.customAmount}
          onChange={(e) => updateFields({ customAmount: e.target.value, presetAmount: null })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
    </div>
  )
}
