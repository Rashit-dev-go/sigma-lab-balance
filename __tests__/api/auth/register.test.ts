import { NextRequest } from 'next/server'
import { POST } from '../../../app/api/auth/register/route'

describe('/api/auth/register', () => {
  it('should register a new user successfully', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'StrongPass123!'
      })
    })

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(data.message).toContain('Пользователь зарегистрирован')
  })

  it('should reject duplicate email', async () => {
    // First registration
    const req1 = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'duplicate@example.com',
        password: 'StrongPass123!'
      })
    })
    await POST(req1)

    // Second registration with same email
    const req2 = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'duplicate@example.com',
        password: 'StrongPass123!'
      })
    })
    const res2 = await POST(req2)
    const data2 = await res2.json()

    expect(res2.status).toBe(400)
    expect(data2.error).toContain('уже существует')
  })

  it('should reject invalid email', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'invalid-email',
        password: 'StrongPass123!'
      })
    })

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toContain('Email и пароль обязательны')
  })

  it('should reject missing password', async () => {
    const req = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com'
      })
    })

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toContain('Email и пароль обязательны')
  })
})
