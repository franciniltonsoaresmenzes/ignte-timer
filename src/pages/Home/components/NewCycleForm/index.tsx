import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

// controlled: controlo estados dentro do react e o outro não / uncontrolled: busco as informações apenas quando eu preciso

const setActiveCycleId = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O cilo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O cilo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof setActiveCycleId>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(setActiveCycleId),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        list="task-suggestions"
        placeholder="Dé um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
        <option value="Banana" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>Minutos</span>
    </FormContainer>
  )
}
