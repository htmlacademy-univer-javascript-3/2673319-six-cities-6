import {Link} from 'react-router-dom';
import {AppRoutes} from '../router/app-routes.ts';

export default function NotFoundPage() {
  return (
    <>
      <h1>404 Not Found</h1>
      <Link to={AppRoutes.Root}>Вернуться на главную</Link>
    </>
  );
}
