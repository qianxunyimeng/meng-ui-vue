import { mount } from '@vue/test-utils'
import FullLoading from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('FullLoading.vue', () => {
  test('render test', () => {
    const wrapper = mount(FullLoading, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
