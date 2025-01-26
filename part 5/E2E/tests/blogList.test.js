const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, newBlog } = require('./blogListHelper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await page.goto('http://localhost:5173')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Hamza Rachdi',
        username: 'hamza',
        password: 'hamza123'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Ali Haidar',
        username: 'ali',
        password: 'ali12345'
      }
    })
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button').getByText('login')).toBeVisible()
    await expect(page.getByText('Hamza Rachdi logged in')).not.toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'hamza', 'hamza123')
      await page.getByText('Hamza Rachdi logged in').waitFor()
      await expect(page.getByText('username')).not.toBeVisible()
      await expect(page.getByText('password')).not.toBeVisible()
      await expect(page.getByRole('button').getByText('login')).not.toBeVisible()
      await expect(page.getByRole('button').getByText('Logout')).toBeVisible()
      await expect(page.getByText('Hamza Rachdi logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'hamza', 'xyz')
      await expect(page.getByText('username')).toBeVisible()
      await expect(page.getByText('password')).toBeVisible()
      await expect(page.getByRole('button').getByText('login')).toBeVisible()
      await expect(page.getByText('Hamza Rachdi logged in' )).not.toBeVisible()
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'hamza', 'hamza123')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await newBlog(page, "sample title", "sample author", "sample url")
      await expect(page.getByText('sample title sample author')).toBeVisible()
      await expect(page.getByRole('button').getByText('view')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await newBlog(page, "sample title", "sample author", "sample url")
      page.getByRole('button').getByText('view').click()
      page.getByRole('button').getByText('like').click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })
    test('a blog can be deleted', async ({ page }) => {
      await newBlog(page, "sample title", "sample author", "sample url")
      page.getByRole('button').getByText('view').click()
      page.getByRole('button').getByText('remove').click()
      page.on('dialog', dialog => dialog.accept());
      await expect(page.getByText('sample title sample author')).not.toBeVisible()
      await expect(page.getByRole('button').getByText('view')).not.toBeVisible()
    })
    test('only blog creator sees delete button', async ({ page }) => {
      await newBlog(page, "sample title", "sample author", "sample url")
      page.getByRole('button').getByText('Logout').click()
      await login(page, 'ali', 'ali12345')
      await page.getByText('Ali Haidar logged in').waitFor()
      page.getByRole('button').getByText('view').click()
      await expect(page.getByRole('button').getByText('remove')).not.toBeVisible()
      await expect(page.getByRole('button').getByText('view')).not.toBeVisible()
    })
    test('blogs are sorted', async ({ page }) => {
      await newBlog(page, "sample title", "sample author", "sample url")
      await page.getByRole('button').getByText('view').click()
      await page.getByRole('button').getByText('like').click()
      await page.getByText('likes 1').waitFor()
      await page.getByRole('button').getByText('hide').click()

      await newBlog(page, "sample title nb 2", "sample author nb 2", "sample url 2")
      await page.getByText('sample title nb 2 sample author nb 2').getByRole('button').getByText('view').click()
      await page.getByRole('button').getByText('like').click()
      await page.getByText('likes 1').nth(1).waitFor()
      await page.getByRole('button').getByText('Logout').click()
      await login(page, 'ali', 'ali12345')
      await page.getByText('Ali Haidar logged in').waitFor()
      await page.getByText('sample title nb 2 sample author nb 2').getByRole('button').getByText('view').click()
      await page.getByRole('button').getByText('like').click()
      await page.getByText('likes 2').waitFor()

      await newBlog(page, "sample title nb 3", "sample author nb 3", "sample url nb 3")
      await page.reload()
      const blogs = page.locator('.blog');
      await expect(blogs.nth(0)).toContainText("sample title nb 2 sample author nb 2")
      await expect(blogs.nth(1)).toContainText("sample title sample author")
      await expect(blogs.nth(2)).toContainText("sample title nb 3 sample author nb 3")
    })
  })
})