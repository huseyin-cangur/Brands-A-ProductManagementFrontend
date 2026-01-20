import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { hasAnyRole } from '../helpers/hasRole'
interface Props {
    roles?: string[];
}

export default function RequireRole({ roles }: Props) {


    console.log("roles", roles)


    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" />;

    }



    if (!hasAnyRole(user?.roles ?? [], roles)) {

        return <Navigate to="/authorization-error" />;
    }

    return <Outlet />;
}
