
/**
 * 判断字符串是否是连字符命名法。例如：first-name
 * 1. 首字符只能是小写字母
 * 2. 尾字符只能是小写字母或数字
 * 3. 中间只能是小写字母、数字和连字符
 * 4. 连字符不能连续出现
 * @param name 
 */
export function isKebabCase(name: string): boolean {
  const reg = /^([a-z][a-z0-9]*)(?:-[a-z0-9]+)*$/;

  return reg.test(name);
}
