export interface FormData {
  firstName: string
  lastName: string
  email: string
  presetAmount: number | null
  customAmount: string
  message: string
}

export interface StepProps {
  data: FormData
  updateFields: (fields: Partial<FormData>) => void
}