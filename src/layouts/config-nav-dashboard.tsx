import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  // {
  //   title: 'System Performance',
  //   path: '/analytics',
  //   icon: icon('ic-analysis'),
  // },
  {
    title: 'Web page Extraction',
    path: '/urls',
    icon: icon('ic-web'),
  },
  {
    title: 'Social media Extaction',

    path: '/socials',
    icon: icon('ic-socials'),
  },
  {
    title: 'Dark web search',
    path: '/darkweb',
    icon: icon('ic-darkweb'),
  },

  {
    title: 'Send Mass Emails',
    path: '/sendemails',
    icon: icon('ic-email'),
  },
  {
    title: 'Documentation',
    path: '/user',
    icon: icon('ic-guide'),
  },
];
