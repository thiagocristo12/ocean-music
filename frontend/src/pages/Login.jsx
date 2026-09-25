import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '../components/ui';
import Logo from '../components/brand/Logo.jsx';
import useAuth from '../hooks/useAuth.js';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field) {
    return (event) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');
    setIsSubmitting(true);
    try {
      await login(form);
      navigate('/onboarding');
    } catch {
      // Mensagem genérica de propósito: não revela se o e-mail existe ou não
      setFormError('E-mail ou senha incorretos.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ocean-50 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <Card>
          <h1 className="text-xl font-bold text-ink-900">Entrar</h1>
          <p className="mt-1 text-sm text-ink-500">Continue de onde parou.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <Input
              label="E-mail"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange('email')}
            />
            <Input
              label="Senha"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange('password')}
            />

            {formError && (
              <p role="alert" className="text-sm text-danger">
                {formError}
              </p>
            )}

            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </Card>

        <p className="mt-4 text-center text-sm text-ink-500">
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className="font-medium text-ocean-700 hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;