// Classes reaproveitadas pelo Button e por <Link> que precisam parecer botões
// (separado do Button.jsx porque esse arquivo só pode exportar o componente)
export const buttonBaseClasses =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export const buttonVariants = {
  primary: 'bg-ocean-600 text-white hover:bg-ocean-700 active:bg-ocean-800',
  secondary: 'border border-ocean-200 bg-white text-ocean-700 hover:bg-ocean-50',
  ghost: 'text-ocean-700 hover:bg-ocean-100',
};