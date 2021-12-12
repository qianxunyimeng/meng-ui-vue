import { mount } from '@vue/test-utils'
import CountTo from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('CountTo.vue', () => {
  test('render test', () => {
    const wrapper = mount(CountTo, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
