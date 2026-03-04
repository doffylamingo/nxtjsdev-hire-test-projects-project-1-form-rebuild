import type { StepProps } from "@/types"

export default function StepPersonalInfo({ data, updateFields }: StepProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block text-sm mb-1">First name</label>
        <input
          id="firstName"
          type="text"
          value={data.firstName}
          onChange={(e) => updateFields({ firstName: e.target.value })}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm mb-1">Last name</label>
        <input
          id="lastName"
          type="text"
          value={data.lastName}
          onChange={(e) => updateFields({ lastName: e.target.value })}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm mb-1">Email</label>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => updateFields({ email: e.target.value })}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
    </div>
  )
}
