import { useState, useEffect, useCallback } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
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
  if (list.length >= max) return list;
  return [...list, slug];
}

function Onboarding() {
  const { user } = useAuth();
  const { profile, isOnboardingComplete, isLoading: profileLoading, saveProfile } = useProfile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') === '1';

  // Verdadeiro quando esta tela só vai redirecionar para outro lugar
  // (perfil já completo, fora do modo de edição). Enquanto o perfil ainda
  // está carregando, tratamos como "vai redirecionar" por segurança, para
  // nunca criar/salvar um rascunho vazio à toa.
  const willRedirectAway = profileLoading || (isOnboardingComplete && !isEditMode);

  const [options, setOptions] = useState(null);
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState(emptyDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ponto de partida do formulário, em ordem de prioridade:
  // 1) um rascunho salvo antes (onboarding/edição interrompidos), ou
  // 2) o perfil já salvo, se a tela foi aberta em modo de edição, ou
  // 3) um formulário em branco.
  useEffect(() => {
    // Nunca prepara nada se a tela vai só redirecionar — evita criar um
    // rascunho vazio que "vaza" para uma futura edição de perfil.
    if (willRedirectAway) return;

    let isCancelled = false;

    async function load() {
      const catalogOptions = await profileService.getOptions();
      const savedDraft = profileService.getDraft(user.id);
      if (isCancelled) return;

      setOptions(catalogOptions);

      if (savedDraft) {
        setDraft(savedDraft);
      } else if (isEditMode && profile) {
        setDraft({
          level: profile.level,
          priorExperience: profile.priorExperience,
          areaSlugs: profile.areaSlugs,
          goalSlugs: profile.goalSlugs,
          styleSlugs: profile.styleSlugs,
        });
      }
    }

    load();
    return () => {
      isCancelled = true;
    };
  }, [user.id, isEditMode, profile, willRedirectAway]);

  useEffect(() => {
    if (!options || willRedirectAway) return;
    profileService.saveDraft(user.id, draft);
  }, [draft, options, user.id, willRedirectAway]);

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

  if (!profileLoading && isOnboardingComplete && !isEditMode) {
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
      navigate(isEditMode ? '/perfil' : '/dashboard');
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

        {isEditMode && (
          <div className="mb-4 flex items-center justify-between">
           <p className="text-sm font-medium text-ocean-600">Editando seu perfil</p>
           <Link to="/perfil" className="text-sm font-medium text-ink-500 hover:underline">
             Cancelar
           </Link>
         </div>
        )}

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
                {isSubmitting ? 'Salvando...' : isEditMode ? 'Salvar alterações' : 'Ir para meu painel'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}

export default Onboarding;