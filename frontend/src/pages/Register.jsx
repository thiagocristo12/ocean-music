import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '../components/ui';
import Logo from '../components/brand/Logo.jsx';
import useAuth from '../hooks/useAuth.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field) {
    return (event) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = 'Informe seu nome.';
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
    if (form.password.length < 8) {
      nextErrors.password = 'Use pelo menos 8 caracteres.';
    }
    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await register(form);
      navigate('/onboarding');
    } catch (error) {
      if (error.code === 'EMAIL_TAKEN') {
        setErrors({ email: error.message });
      } else {
        setFormError('Não foi possível criar sua conta. Tente novamente.');
      }
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
          <h1 className="text-xl font-bold text-ink-900">Criar conta</h1>
          <p className="mt-1 text-sm text-ink-500">
            Leva menos de um minuto. Depois é só montar seu perfil musical.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <Input
              label="Nome"
              autoComplete="name"
              value={form.name}
              onChange={handleChange('name')}
              error={errors.name}
            />
            <Input
              label="E-mail"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
            />
            <Input
              label="Senha"
              type="password"
              autoComplete="new-password"
              hint="Mínimo de 8 caracteres."
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
            />

            {formError && (
              <p role="alert" className="text-sm text-danger">
                {formError}
              </p>
            )}

            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>
        </Card>

        <p className="mt-4 text-center text-sm text-ink-500">
          Já tem conta?{' '}
          <Link to="/login" className="font-medium text-ocean-700 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;