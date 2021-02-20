import { shallowMount } from '@vue/test-utils'
import Todo from '@/components/Todo.vue'

describe('Todo.vue', () => {
  it('renders props.todo when passed', () => {
    const todo = {
      title: 'new todo',
      isCompleted: false
    }
    const wrapper = shallowMount(Todo, {
      props: { todo }
    })
    expect(wrapper.text()).toMatch(todo.title)
  })
})
