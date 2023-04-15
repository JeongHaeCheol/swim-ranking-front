// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: '내기록',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: '대회기록',
    path: '/dashboard/record',
    icon: icon('ic_user'),
  },
  {
    title: '내수영장기록',
    path: '/dashboard/mypoolrecord',
    icon: icon('ic_user'),
  },
  {
    title: '상품',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: '블로그',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: '로그인',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
