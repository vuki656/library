import type { z } from 'zod'

import type { loginValidation } from './Login.validation'

export type LoginFormValueType = z.infer<typeof loginValidation>
