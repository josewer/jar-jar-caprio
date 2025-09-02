import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import CreateExerciseComponent from './CreateExerciseComponent.vue'
import { Categories } from '../enums/Categories.js'
import { Muscles } from '../enums/Muscles.js'
import { Form } from 'vee-validate'

describe('CreateExerciseComponent', () => {
    let store

    beforeEach(() => {
        setActivePinia(createPinia())
        store = require('../stores/exercise.js').useExerciseStore()
    })

    it('creates a new exercise when the form is submitted', async () => {
        const wrapper = mount(CreateExerciseComponent, {
            global: {
                stubs: {
                    HeaderComponent: true
                }
            }
        })

        // Rellenamos los campos
        await wrapper.find('input#name').setValue('Jose')
        await wrapper.find('select#category').setValue(Categories.CARDIO)
        await wrapper.find('select#muscle').setValue(Muscles.LEGS)

        // Buscamos el componente Form y disparamos @submit directamente
        const form = wrapper.findComponent(Form)
        await form.vm.$emit('submit', {
            name: 'Jose',
            category: Categories.CARDIO,
            muscle: Muscles.LEGS
        }, { resetForm: () => { } })

        // Comprobamos que el store recibió la creación
        const exercises = store.getAll()
        expect(exercises.length).toBe(1)
        expect(exercises[0]).toEqual(expect.objectContaining({
            name: 'Jose',
            category: Categories.CARDIO,
            muscle: Muscles.LEGS
        }))
    })
})