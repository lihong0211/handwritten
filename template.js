const reg = /\{\{(\w+)\}\}/
function render(template, data) {
  if (!reg.exec(template)) return template
  const name = reg.exec(template)[1]
  template = template.replace(reg, data[name])
  return render(template, data)
}

const template = '我是{{name}}, 年龄{{age}}, 性别{{sex}}'
const person = {
  name: '力宏',
  age: '33',
  sex: '男'
}
console.log(render(template, person))
