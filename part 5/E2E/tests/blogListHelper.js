const login = async (page, name, password) => {
  await page.getByTestId('name').fill(name)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button').getByText('login').click()
}
const newBlog = async (page, title, author, url) => {
  await page.getByRole('button').getByText('new blog').click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button').getByText('create').click()
  await page.getByText(`${title} ${author}`).waitFor()
}
export { login, newBlog }