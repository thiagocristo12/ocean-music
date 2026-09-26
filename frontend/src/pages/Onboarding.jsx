import { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import Logo from '../components/brand/Logo.jsx';
import OnboardingProgress from '../components/onboarding/OnboardingProgress.jsx';
import StepLevel from '../components/onboarding/StepLevel.jsx';
import StepAreas from '../components/onboarding/StepAreas.jsx';
import StepGoals from '../components/onboarding/StepGoals.jsx';
import StepStyles from '../components/onboarding/StepStyles.jsx';
import StepSummary from '../components/onboarding/StepSummary.jsx';
import useAuth from '../hooks/useAuth.js';
import useProfile from '../hooks/useProfile.js';
import * as profileService from '../services/profileService.js';

const TOTAL_STEPS = 5;

const emptyDraft = {
  level: null,
  priorExperience: null,
  areaSlugs: [],
  goalSlugs: [],
  styleSlugs: [],
};

function toggleSlug(list, slug, max) {
  if (list.includes(slug)) return list.filter((item) => item !== slug);
  if (list.length >= max) return list; // já atingiu o limite: ignora o clique
  return [...list, slug];
}

function Onboarding() {
  const { user } = useAuth();
  const { isOnboardingComplete, isLoading: profileLoading, saveProfile } = useProfile();
  const navigate = useNavigate();

  const [options, setOptions] = useState(null);
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState(emptyDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carrega o catálogo (áreas/objetivos/estilos) e um rascunho salvo antes,
  // caso o usuário tenha saído no meio do onboarding.
  useEffect(() => {
    let isCancelled = false;

    async function load() {
      const catalogOptions = await profileService.getOptions();
      const savedDraft = profileService.getDraft(user.id);
      if (isCancelled) return;
      setOptions(catalogOptions);
      if (savedDraft) setDraft(savedDraft);
    }

    load();
    return () => {
      isCancelled = true;
    };
  }, [user.id]);

  // Salva o rascunho a cada mudança (só depois que o catálogo já carregou,
  // para não sobrescrever um rascunho salvo com os valores em branco)
  useEffect(() => {
    if (!options) return;
    profileService.saveDraft(user.id, draft);
  }, [draft, options, user.id]);

  const updateDraft = useCallback((patch) => {
    setDraft((current) => ({ ...current, ...patch }));
  }, []);

  const toggleArea = useCallback((slug) => {
    setDraft((current) => ({ ...current, areaSlugs: toggleSlug(current.areaSlugs, slug, 3) }));
  }, []);

  const toggleGoal = useCallback((slug) => {
    setDraft((current) => ({ ...current, goalSlugs: toggleSlug(current.goalSlugs, slug, 3) }));
  }, []);

  const toggleStyle = useCallback((slug) => {
    setDraft((current) => ({ ...current, styleSlugs: toggleSlug(current.styleSlugs, slug, 3) }));
  }, []);

  // Quem já concluiu o onboarding antes não deve ver o formulário de novo
  if (!profileLoading && isOnboardingComplete) {
    return <Navigate to="/dashboard" replace />;
  }

  if (profileLoading || !options) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ocean-50">
        <p className="text-ink-500">Carregando...</p>
      </div>
    );
  }

  const canContinue =
    (step === 1 && draft.level && draft.priorExperience) ||
    (step === 2 && draft.areaSlugs.length > 0) ||
    step === 3 ||
    step === 4;

  function goNext() {
    setStep((current) => Math.min(TOTAL_STEPS, current + 1));
  }

  function goBack() {
    setStep((current) => Math.max(1, current - 1));
  }

  async function handleFinish() {
    setIsSubmitting(true);
    try {
      await saveProfile(draft);
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-ocean-50 p-4 sm:p-6">
      <div className="mx-auto max-w-lg">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <OnboardingProgress current={step} total={TOTAL_STEPS} />

        <Card>
          {step === 1 && <StepLevel draft={draft} onChange={updateDraft} />}
          {step === 2 && (
            <StepAreas areas={options.areas} selectedSlugs={draft.areaSlugs} onToggle={toggleArea} />
          )}
          {step === 3 && (
            <StepGoals
              goals={options.goals}
              areaSlugs={draft.areaSlugs}
              selectedSlugs={draft.goalSlugs}
              onToggle={toggleGoal}
            />
          )}
          {step === 4 && (
            <StepStyles
              styles={options.styles}
              selectedSlugs={draft.styleSlugs}
              onToggle={toggleStyle}
            />
          )}
          {step === 5 && (
            <StepSummary
              draft={draft}
              areas={options.areas}
              goals={options.goals}
              styles={options.styles}
              onEditStep={setStep}
            />
          )}

          <div className="mt-6 flex gap-3">
            {step > 1 && (
              <Button variant="secondary" onClick={goBack} disabled={isSubmitting}>
                Voltar
              </Button>
            )}

            {step < TOTAL_STEPS && (
              <Button
                onClick={goNext}
                disabled={!canContinue}
                fullWidth={step === 1}
                className={step > 1 ? 'flex-1' : ''}
              >
                Continuar
              </Button>
            )}

            {step === TOTAL_STEPS && (
              <Button onClick={handleFinish} disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Salvando...' : 'Ir para meu painel'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}

export default Onboarding;