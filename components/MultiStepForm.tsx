"use client"

import { useState } from "react"
import ProgressIndicator from "./ProgressIndicator"
import StepPersonalInfo from "./StepPersonalInfo"
import StepDonation from "./StepDonation"
import StepReview from "./StepReview"
import type { FormData } from "@/types"

const INITIAL_FORM_DATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  presetAmount: null,
  customAmount: "",
  message: "",
}

const TOTAL_STEPS = 3
const STEP_LABELS = ["Personal Info", "Donation", "Review & Submit"]

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const updateFields = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  const handleNext = () => {
    const newErrors: string[] = []

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.push("First name is required")
      if (!formData.lastName.trim()) newErrors.push("Last name is required")
      if (!formData.email.trim()) newErrors.push("Email is required")
      else if (!formData.email.includes("@")) newErrors.push("Please enter a valid email")
    }

    if (currentStep === 2) {
      if (formData.presetAmount === null && !formData.customAmount.trim()) {
        newErrors.push("Please select or enter a donation amount")
      }
    }

    setErrors(newErrors)
    if (newErrors.length > 0) return

    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
  }

  const handleBack = () => {
    setErrors([])
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    const amount =
      formData.presetAmount !== null
        ? formData.presetAmount
        : formData.customAmount
          ? parseFloat(formData.customAmount)
          : null

    console.log({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      donationAmount: amount,
      message: formData.message || undefined,
    })

    setSubmitted(true)
  }

  if (submitted) {
    const displayAmount =
      formData.presetAmount !== null
        ? `$${formData.presetAmount}`
        : formData.customAmount
          ? `$${formData.customAmount}`
          : ""

    return (
      <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Thank you for your donation!</h2>
          <p className="text-gray-600 mb-1">
            {formData.firstName}, your {displayAmount} donation has been received.
          </p>
          <p className="text-gray-500 text-sm">
            A confirmation has been sent to {formData.email}.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-start justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Donation Form</h1>

        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          labels={STEP_LABELS}
        />

        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {errors.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </div>
        )}

        {currentStep === 1 && (
          <StepPersonalInfo data={formData} updateFields={updateFields} />
        )}
        {currentStep === 2 && (
          <StepDonation data={formData} updateFields={updateFields} />
        )}
        {currentStep === 3 && (
          <StepReview data={formData} updateFields={updateFields} />
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          {currentStep < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
